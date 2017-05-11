---
title: ローディングコンポーネント(styled-spinkit)の作成 および styled-componentsとreact-storybook雑感
date: "2017-05-12"
path: "/styled-spinkit/"
---

![gif](https://camo.githubusercontent.com/ef4b8106220d7a2b7fef3d2e1c6f300f54deb299/68747470733a2f2f692e6779617a6f2e636f6d2f39666466313063373365646431363439356138353462313939653866396565302e676966)

[akameco/styled-spinkit: Spinner Loading components](https://github.com/akameco/styled-spinkit)

シンプルなローディングコンポーネントがほしくてつくった。
基本的には、[SpinKit](https://github.com/tobiasahlin/SpinKit)をそのままコンポーネント化した。

Propsやコンポーネントは以下の通り。

|Prop|Type|Default|
|---|---|---|
|color|string|#333|
|size|number|40|

```
<ChasingDots/>
<Circle/>
<CubeGrid/>
<Pulse/>
<FadingCircle/>
<ThreeBounce/>
<FoldingCube/>
<WanderingCubes/>
<WaveLoading/>
<DoubleDounceLoading/>
<RotaingPlaneLoading/>
```

## react-storybook
React StoryBookを使って開発してみたが、非常によかった。
以下がその操作画面だ。
propsの変更や背景を変えてコンポーネントを確認できる。
styled-spinkitでは、colorとsizeが変更可能だ。

<div class="youtube">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/SafaQIPjVkA" frameborder="0" allowfullscreen></iframe>
</div>

そのままgithub-pagesを使ってデモにしたので、実際にpropsや背景をいじってみるのとその良さを一部体験できる。

[DEMO: React Storybook](https://akameco.github.io/styled-spinkit/?knob-color=%23333&knob-number=40&selectedKind=ChangeDots&selectedStory=render&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel)

すぐにpropsに変更によってどう変わるのかが確認できるのは非常にメリットだ。

また、Addonの追加により色々可能になって便利だった。
knobsはpropsを変更可能にするアドオン。
backgroundsはその名の通り背景を変更するアドオンだ。

- @kadira/storybook-addon-knobs
- react-storybook-addon-backgrounds


今回はclickなどのアクションがないので、その威力を十二分には発揮してないが、HMRによってストレスなく開発でき、Reactを使うなら必須だろうと思う。

Storybookについてはまた記事にしたいと思う。

## styled-components

さて、今回はsytle属性をそのまま扱わずCSSinJSの中でも飛び抜けて素晴らしいと思っているstyled-componentsを利用した。

[styled-components/styled-components: Visual primitives for the component age 💅](https://github.com/styled-components/styled-components)

いくつかその利点を述べたい。

が、使い方はREADMEが詳しいので一切書かないので、各々上記のリンクからREADMEを読んでほしい。

さて、最も大きく、そして最大の利点はstyle属性へ付加するのではなく、headにcssを出力する点にある。
styled-componentsはstyleのhashを計算それをclassNameとし、styleタグにcssを出力する。

これは、つまり変更が容易であるということだ。

既存のライブラリを活用して新しくコンポーネントをつくるとき、問題となるのはstyle属性でスタイリングされていて、上書きには、propsでstyleを渡す必要がある場合だ。
これは、Objectでstyleを定義するのを強制される。

```js
const sytle = {
  width: '200px',
  height: '200px',
}
```

しかし、あなたのプロジェクトでは、css-loaderで読み込んでいるかもしれないし、css-moduleを使っているかもしれない、もしくは他のCSSinJSのライブラリを使っているかもしれない。  
いずれにせよ、せっかくのcssをよりベストな方法で書いているにも関わらず、オブジェクトでのスタイリングを強制されるのだ。
ああ、なんて最悪だ。
そう、[material-ui](https://github.com/callemall/material-ui)。お前だよお前。

しかしながら、cssをjsとは別で配布するのはよろしい判断だとは思わない。
なぜなら、プロジェクトに不必要なcssに同時に依存することになるからだ。

jsのコンポーネントだけならwebpack2のtree shakingを用いて使われていないコンポーネントをそのまま除去できる。
しかし、cssでは？

本ライブラリはtree shakingが可能なようにcjs向けとes向けに両方ビルドしてある。
ビルドにはrollupを使った。
package.jsonにes向けにビルドしたライブラリは、`module`と`jsnext:main`で指定する。
そうするとwebpackやrollupがそちらを優先して読むようになる。
こうすることで、tree shakingが効果を発揮し、使わないコンポーネントはビルドから外すことが可能だ。

### styled-components v2

ちなみに、ある理由から安定版である1.4.5ではなく、v2を使っている。

そのある理由とは、ネストした子コンポーネントへのスタイリングだ。
これは親へのスタイリングのためのpropsを子へ流すのに便利だ。
例えば、子コンポーネントが同じbackground-colorを必要とするとき、全ての子コンポーネントにpropsで渡さずに親に渡してやるだけで済む。

Before:

```js
const Child = styled.div`
  width: 20px;
  background-color: ${p => p.color};
`

const Parent = styled.div`
`

const App = () => (
  <Parent>
    <Child color="red"/>
    <Child color="red"/>
    <Child color="red"/>
  </Parent>
)
```

After:

```js
const Child = styled.div`
  width: 20px;
`

const Parent = styled.div`
  > ${Child} {
    background-color: ${p => p.color};
  }
`

const App = () => (
  <Parent color="red">
    <Child/>
    <Child/>
    <Child/>
  </Parent>
)
```

この機能がv2からの対応でv1では使えない。
そのため2.0.0-17を指定して使っている。(その分、バグる可能性大だ。これは大きなデメリットである)

### デメリット
さて、デメリットを述べないのはフェアじゃない。
僕は狂信者ではないので、いくつかデメリットも書こうと思う。

1. v2は壊れる。

styled-componentsのv2はいわゆるベータ版だ。
v2をプロジェクトに導入するには早すぎる。
SSR対応など目玉機能もあるとはいえ、悪いことは言わないので大人しくv1を使った方がいい。

2. 拡張性

先程、styled-componentsはカスタマイズし易いと言ったな。
あれは一部は嘘だ。

[styled-components/existing-css.md at master · styled-components/styled-components](https://github.com/styled-components/styled-components/blob/master/docs/existing-css.md)

上記のリンクに書いてある通り、classNameをオーバーライドしたところで、style-loaderはcssの挿入順序を制御できない。
つまり、cssは後に書かれた方が優先されるため、styled-componentsによるstyleの挿入が後になると自分がオーバーライドしたつもりでオーバーライドされる。
これを回避するためにcssの優先度を上げるハックをする必要がある。
つまり、同じ名前のクラスを2つ繋げる。

```css
/* my-component.css */
.red-bg.red-bg {
  background-color: red;
}
```

うーん。これはひどいな。
しかしstyleを渡せばそれが優先されるし、styled-componentsを使っていればstyledでラップするだけなので個人的にはstyled-componentsで書かれているのは選択肢が増えていいのだけれど。

## まとめ
StoryBook: めっちゃ便利だ。今すぐ使った方がいい。  
sytled-components: v2はまだはやい。が、CSSinJSの中でもずば抜けてる。今すぐ使った方がいい。  
styled-spinkit: つくった。別に使わなくていい。

- [storybooks/storybook: 📚 UI Component Dev Environment for React](https://github.com/storybooks/storybook)

- [styled-components/styled-components: Visual primitives for the component age 💅](https://github.com/styled-components/styled-components)

- [akameco/styled-spinkit: Spinner Loading components](https://github.com/akameco/styled-spinkit)

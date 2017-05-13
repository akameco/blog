---
title: touch時に空ファイルではなくテンプレートからファイルを作成する
date: "2017-05-13"
path: "/touch-alt/"
---

touchコマンドは基本的に新しいファイルを作成するときに使っている。
となると空ファイルが作られてしまうのはよろしくない。

例えば、licenseファイルをプロジェクトに含め忘れたので後から追加したいとする。
そのとき叩くのは、touch licenseもしくは、既存のプロジェクトからlicenseを探してcpをする。

ここで思い至るのは、licenseファイルの内容はほぼ変わることがない。だいたい以下のような感じである。

```txt
The MIT License (MIT)

Copyright (c) akameco <akameco.t@gmail.com> (akameco.github.io)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
(略)
```

となると、これをテンプレートとしてtouchの代わりにこれを新しいファイルとして作成した方が良さそうだ。

そこで、touchの代わりに使えるtouch-altを作ってみた。

[akameco/touch-alt: Create from a template instead of a new file](https://github.com/akameco/touch-alt)

```sh
$ npm install --global touch-alt
```

使い方はtouchと同じだが、touchの本来の機能であるタイムスタンプ更新の機能はない。
自分はほぼ使わないのでalias touch=touch-altを.zshrcに追記した。

さて、使い方はtouchと同じだ。
だが、--addフラグで新しいテンプレートを追加できる。
追加されたファイルは~/.touch-alt以下に保存される。


```sh
$ touch-alt --add license
```

後は、touchの代わりにtouch-altでlicenseを作成するだけだ。

```sh
$ touch license
$ cat license

$ rm license
$ ls -la ~/.touch-alt
.             ..            license
$ touch-alt license
$ cat license
The MIT License (MIT)

Copyright (c) akameco <akameco.t@gmail.com> (akameco.github.io)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
(略)
```

もちろん、テンプレートがないファイルは空ファイルを作成する。

## まとめ

自分はわりとyeomenでテンプレートを作成することが多いが、既存のプロジェクトにわりといつも使う設定を持ってきたいときに便利であると思う。
例えば、.babelrcや.eslinrc、.editorconfigなどがそれだ。

自分で使っててわりと便利なので、是非使ってくれると嬉しい。

[akameco/touch-alt: Create from a template instead of a new file](https://github.com/akameco/touch-alt)

実際のところ、すでにテンプレートが保存してあればそれをコピーしてくるだけのスクリプトだが、この手のスクリプトはどうやってもtestの方が行数が増えるのが面倒なところだった。

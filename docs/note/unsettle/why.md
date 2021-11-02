# Why my note?

## first
-
  > 算是finalshell的替代

- 先在本地安装remote ssh插件，然后 点左下角，打开配置文件，先择第一个，用户目录下的.ssh
	
	```
	  Host ucloud
	      HostName 106.75.162.14
	      User root
	```
- 本机生成ssh公匙
  `ssh-keygen`
  然后一路回车，最后在$home/.ssh下发现id_rsa.pub(公)和id_rsa（私）
- 登录远程服务器，上传公匙
```
mkdir ~/.ssh/
cd ~/.ssh/
vim authorized_keys
```
- 将客户端的id_rsa.pub中的公钥复制到authorized_keys中，保存并退出vim
- vim,进入后按i编辑，编辑完esc退出编辑模式，:wq，保存并退出。:q!不保存退出
- 点击vscode的连接即可，第一次会要下载vscode-server，多等一会，他会让填服务器操作系统，填完就下好了
- [The authenticity of host '106.75.162.14 (106.75.162.14)' can't be established. 点击重试即可](https://blog.csdn.net/Wbiokr/article/details/73431199)
- [参考](https://zhuanlan.zhihu.com/p/124105812)
## second
- [更新yum源为阿里源](https://zhuanlan.zhihu.com/p/106719292)
- ubuntu apt,centos yum
- 修改vscode默认shell
	- https://cloud.tencent.com/developer/ask/198549
	- `"terminal.integrated.defaultProfile.linux": "zsh"`
## third

```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: string | number | undefined; // 因为age不一定有，可能是undefined
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};
```

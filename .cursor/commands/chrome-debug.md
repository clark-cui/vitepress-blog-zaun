启动带远程调试功能的 Chrome 浏览器，用于 MCP 连接：

1. 检查是否有 Chrome 进程正在运行，如果有则提示用户先手动关闭 Chrome (Cmd+Q)
2. 执行以下命令启动 Chrome：
   ```bash
   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
     --remote-debugging-port=9222 \
     --user-data-dir=/tmp/chrome-profile-stable
   ```
3. 等待 3 秒后，验证调试端口是否正常：
   ```bash
   curl -s http://localhost:9222/json/version
   ```
4. 如果返回 JSON 数据则表示成功，提示用户可以使用 chrome-devtools MCP 了
5. 如果失败则输出错误信息

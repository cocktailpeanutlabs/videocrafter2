const path = require('path')
module.exports = {
  version: 1,
  title: "VideoCrafter 2",
  description: "[Runs fast on NVIDIA GPUs. Works on M1/M2/M3 Macs but slow] VideoCrafter is an open-source video generation and editing toolbox for crafting video content. It currently includes the Text2Video and Image2Video models https://github.com/AILab-CVC/VideoCrafter",
  icon: "icon.png",
  menu: async (kernel) => {
    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, 'app', "env")
    let running = await kernel.running(__dirname, "start.js")
    if (installing) {
      return [{
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local && local.url) {
          return [{
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        } else {
          return [{
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else {
        return [{
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
          params: {
            model: "t2v"
          }
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-solid fa-broom",
          text: "Factory Reset",
          href: "reset.js",
        }]
      }
    } else {
      return [{
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}

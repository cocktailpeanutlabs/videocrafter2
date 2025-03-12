module.exports = async (kernel) => {
  return {
    "cmds": {
      "nvidia": "pip install torch torchvision torchaudio xformers --index-url https://download.pytorch.org/whl/cu118",
      "amd": "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm6.2",
      "default": "pip install torch torchvision torchaudio"
    },
    "run": [{
      "method": "shell.run",
      "params": {
        "message": "git clone https://github.com/peanutcocktail/VideoCrafter app"
      }
    }, {
      "method": "shell.run",
      "params": {
        "path": "app",
        "venv": "env",
        "message": [
          "python -m pip install pip==24.0",
          "{{(gpu === 'nvidia' ? self.cmds.nvidia : ((gpu === 'amd' && platform === 'linux') ? self.cmds.amd : self.cmds.default))}}",
          "pip install -r requirements.txt",
          "pip install {{platform === 'darwin' ? 'eva-decord' : 'decord'}}",
        ]
      }
    }, {
      "method": "notify",
      "params": {
        "html": "Click 'text to video' or 'image to video' to start!"
      }
    }]
  }
}

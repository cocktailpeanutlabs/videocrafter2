module.exports = async (kernel) => {
  return {
    "cmds": {
      "nvidia": "uv pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 xformers --index-url https://download.pytorch.org/whl/cu124",
      "amd": "uv pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/rocm6.2",
      "default": "uv pip install torch==2.5.0 torchvision==0.20.0 torchaudio==2.5.0 --index-url https://download.pytorch.org/whl/cpu"
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
          "uv pip install -r requirements.txt",
          "uv pip install {{platform === 'darwin' ? 'eva-decord' : 'decord'}}",
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

module.exports = {
  daemon: true,
  models: {
    t2v: {
      uri: "https://huggingface.co/VideoCrafter/VideoCrafter2/resolve/main/model.ckpt?download=true",
      path: "app/checkpoints/base_512_v2"
    },
    i2v: {
      uri: "https://huggingface.co/VideoCrafter/Image2Video-512/resolve/main/model.ckpt?download=true",
      path: "app/checkpoints/i2v_512_v1"
    }
  },
  run: [{
    "method": "local.set",
    "params": {
      "model": "{{input.model}}"
    }
  }, {
    "method": "fs.download",
    "params": {
      "uri": "{{self.models[local.model].uri}}",
      "dir": "{{self.models[local.model].path}}"
    }
  }, {
    "method": "shell.run",
    "params": {
      "path": "app",
      "venv": "env",
      "message": "python gradio_app.py",
      "on": [{ "event": "/http:\/\/[0-9.:]+/", "done": true }]
    }
  }, {
    "method": "local.set",
    "params": {
      "url": "{{input.event[0]}}"
    }
  }]
}

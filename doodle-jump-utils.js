// Name: Doodle jump utils
// ID: Doodle jump utils
// Description: Helpers for Doodle Jump development.

(function (Scratch) {
  "use strict";

  const DEFAULT_MAP_SEED = 4356348786;
  const DEFAULT_MAP_WIDTH = 480;
  const DEFAULT_CHUNK_SIZE = 60;

  const map = {
    seed: DEFAULT_MAP_SEED,
    width: DEFAULT_MAP_WIDTH,
    chunk: DEFAULT_CHUNK_SIZE,
  };

  class DoodleJumpExtension {
    // getInfo() defines the blocks and UI elements
    getInfo() {
      return {
        id: "doodlejumpextension", // A unique ID for your extension
        name: Scratch.translate("Doodle Jump Utils"), // The name that appears in the Scratch toolbox
        color1: "#007e69", // The primary color of the blocks

        blocks: [
          {
            opcode: "setMapSeed",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set map seed [seed]"),
            arguments: {
              seed: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: DEFAULT_MAP_SEED,
              },
            },
          },
          {
            opcode: "setMapWidth",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set map width [width]"),
            arguments: {
              width: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: DEFAULT_MAP_WIDTH,
              },
            },
          },

          "---",

          {
            opcode: "setChunkSize",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set chunk size [size]"),
            arguments: {
              size: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: DEFAULT_CHUNK_SIZE,
              },
            },
          },

          "---",

          {
            opcode: "getPlatformX",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("platform x in [n] chunk"),
            arguments: {
              n: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "getPlatformY",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("platform y in [n] chunk"),
            arguments: {
              n: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },

          "---",

          {
            // A Reporter block that returns a string
            opcode: "hash",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("hash [x]"),
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
        ],
      };
    }

    // Returns value from 0 to 1 using the X argument
    _hash(x) {
      // Math.imul protects against floating-point precision loss during large multiplications
      x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
      x = x >>> 0; // Convert back to unsigned

      x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
      x = x >>> 0; // Convert back to unsigned

      x = (x >>> 16) ^ x;

      // Divide by 2^32 to get a normalized value from 0.0 to exactly 1.0 (exclusive usually, but close enough)
      return (x >>> 0) / 4294967295;
    }

    hash({ x }) {
      return this._hash(x);
    }

    setMapSeed({ seed }) {
      map.seed = seed;
    }

    setMapWidth({ width }) {
      map.width = width;
    }

    setChunkSize({ size }) {
      map.chunk = size;
    }

    getPlatformX({ n }) {
      return ((this._hash(n) * map.seed) % map.width) - map.width / 2;
    }

    getPlatformY({ n }) {
      return n * map.chunk + ((this._hash(n) * map.seed) % map.chunk);
    }
  }

  // Register the extension with Scratch/TurboWarp
  Scratch.extensions.register(new DoodleJumpExtension());
})(Scratch);

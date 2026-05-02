class MathUtils {
  // getInfo() defines the blocks and UI elements
  getInfo() {
    return {
      id: 'mathutils', // A unique ID for your extension
      name: 'Math Utils', // The name that appears in the Scratch toolbox
      color1: '#0088ff', // The primary color of the blocks
      
      blocks: [
        {
          // A Reporter block that returns a string
          opcode: 'hash',
          blockType: Scratch.BlockType.REPORTER,
          text: 'hash [X]',
          arguments: {
            X: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '0'
            }
          }
        }
      ]
    };
  }

  // Returns value from 0 to 1 using the X argument
  hash(args) {
    // >>> 0 forces any input (including floats or negatives) into a 32-bit unsigned integer
    let x = args.X >>> 0; 
    
    // Math.imul protects against floating-point precision loss during large multiplications
    x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
    x = x >>> 0; // Convert back to unsigned
    
    x = Math.imul((x >>> 16) ^ x, 0x45d9f3b);
    x = x >>> 0; // Convert back to unsigned
    
    x = (x >>> 16) ^ x;
    
    // Divide by 2^32 to get a normalized value from 0.0 to exactly 1.0 (exclusive usually, but close enough)
    return (x >>> 0) / 4294967295; 
  }
}

// Register the extension with Scratch/TurboWarp
Scratch.extensions.register(new MathUtils());
import { join, Path, PathFragment } from '@angular-devkit/core';
import { DirEntry, Tree } from '@angular-devkit/schematics';

export class ModuleFinder {
  constructor(private tree: Tree) {}

  public find(path: Path): Path | null {
    const generatedDirectory: DirEntry = this.tree.getDir(path);
    return this.findIn(generatedDirectory);
  }

  private findIn(directory: DirEntry): Path | null {
    if (!directory) {
      return null;
    }
    const moduleFilename: PathFragment = directory.subfiles.find(filename =>
      /\.module\.(t|j)s$/.test(filename)
    );
    return moduleFilename !== undefined
      ? join(directory.path, moduleFilename.valueOf())
      : this.findIn(directory.parent);
  }
}

// export class ModuleFinder {
//   constructor(private tree: Tree) {}

//   public find(options: FindOptions): Path | null {
//     console.log('ModuleFinder#find...');
//     const generatedDirectoryPath: Path = options.path;
//     console.log('GeneratedDirectoryPath: ', generatedDirectoryPath);
//     const generatedDirectory: DirEntry = this.tree.getDir(
//       generatedDirectoryPath
//     );
//     return this.findIn(generatedDirectory);
//   }

//   private findIn(directory: DirEntry): Path | null {
//     if (!directory) {
//       console.log('no directory');
//       return null;
//     }
//     const moduleFilename: PathFragment = directory.subfiles.find(filename =>
//       /\.module\.(t|j)s$/.test(filename)
//     );
//     console.log('rootModuleFileName: ', moduleFilename);
//     return moduleFilename !== undefined
//       ? join(directory.path, moduleFilename.valueOf())
//       : this.findIn(directory.parent);
//   }
// }

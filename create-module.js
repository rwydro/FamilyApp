const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

// Funkcja do tworzenia pliku
const createFile = (filePath, content) => {
  fs.writeFileSync(filePath, content, { flag: 'w' });
  console.log(`Plik utworzony: ${filePath}`);
};

// Funkcja do tworzenia katalogu
const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Katalog utworzony: ${dirPath}`);
  }
};

// Zapytaj użytkownika o nazwę modułu
inquirer.prompt([
  {
    type: 'input',
    name: 'moduleName',
    message: 'Podaj nazwę modułu (np. users):',
    validate: (input) => {
      if (input) return true;
      return 'Nazwa modułu nie może być pusta!';
    }
  }
]).then(answers => {
  const moduleName = answers.moduleName.toLowerCase(); // Zmieniamy na małe litery, aby uniknąć problemów z wielkościami liter
  const modulePath = path.join(__dirname, 'src', moduleName);

  // Tworzenie katalogów
  createDir(modulePath);
  createDir(path.join(modulePath, 'commands'));
  createDir(path.join(modulePath, 'db'));
  createDir(path.join(modulePath, 'handlers'));
  createDir(path.join(modulePath, 'queries'));

  // Tworzenie plików
  createFile(path.join(modulePath, 'dtos.ts'), `
export class Create${capitalize(moduleName)}Dto {
  readonly name: string;
  readonly email: string;
}

export class Update${capitalize(moduleName)}Dto {
  readonly name: string;
  readonly email: string;
}
`);

  createFile(path.join(modulePath, `${moduleName}.controller.ts`), `
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ${capitalize(moduleName)}Service } from './${moduleName}.service';
import { Create${capitalize(moduleName)}Dto, Update${capitalize(moduleName)}Dto } from './dtos';

@Controller('${moduleName}s')
export class ${capitalize(moduleName)}Controller {
  constructor(private readonly ${moduleName}Service: ${capitalize(moduleName)}Service) {}

  @Post('create')
  create(@Body() create${capitalize(moduleName)}Dto: Create${capitalize(moduleName)}Dto) {
    return this.${moduleName}Service.create(create${capitalize(moduleName)}Dto);
  }

  @Get()
  findAll() {
    return this.${moduleName}Service.findAll();
  }
}
`);

  createFile(path.join(modulePath, `${moduleName}.module.ts`), `
import { Module } from '@nestjs/common';
import { ${capitalize(moduleName)}Controller } from './${moduleName}.controller';
import { ${capitalize(moduleName)}Service } from './${moduleName}.service';
import { DbService } from './db/db.service';

@Module({
  imports: [],
  controllers: [${capitalize(moduleName)}Controller],
  providers: [${capitalize(moduleName)}Service, DbService],
})
export class ${capitalize(moduleName)}Module {}
`);

  createFile(path.join(modulePath, `${moduleName}.service.ts`), `
import { Injectable } from '@nestjs/common';
import { Create${capitalize(moduleName)}Dto, Update${capitalize(moduleName)}Dto } from './dtos';
import { DbService } from './db/db.service';

@Injectable()
export class ${capitalize(moduleName)}Service {
  constructor(private readonly dbService: DbService) {}

  create(create${capitalize(moduleName)}Dto: Create${capitalize(moduleName)}Dto) {
    return this.dbService.create${capitalize(moduleName)}(create${capitalize(moduleName)}Dto);
  }

  findAll() {
    return this.dbService.findAll${capitalize(moduleName)}();
  }

  update(id: string, update${capitalize(moduleName)}Dto: Update${capitalize(moduleName)}Dto) {
    return this.dbService.update${capitalize(moduleName)}(id, update${capitalize(moduleName)}Dto);
  }
}
`);

  // Tworzenie pliku w katalogu db
  createFile(path.join(modulePath, 'db', 'db.service.ts'), `
import { Injectable } from '@nestjs/common';
import { Create${capitalize(moduleName)}Dto, Update${capitalize(moduleName)}Dto } from '../dtos';

@Injectable()
export class DbService {
  create${capitalize(moduleName)}(create${capitalize(moduleName)}Dto: Create${capitalize(moduleName)}Dto) {
    // Przykład: Możesz tutaj połączyć się z bazą danych
    return '${capitalize(moduleName)} created';
  }

  findAll${capitalize(moduleName)}() {
    return 'All ${moduleName}s fetched';
  }

  update${capitalize(moduleName)}(id: string, update${capitalize(moduleName)}Dto: Update${capitalize(moduleName)}Dto) {
    return '${capitalize(moduleName)} updated';
  }
}
`);

  console.log('Struktura modułu została wygenerowana!');
});

// Funkcja do kapitalizacji pierwszej litery
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

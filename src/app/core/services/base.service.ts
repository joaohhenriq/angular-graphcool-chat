import { DataProxy } from 'apollo-cache';
import { DocumentNode } from 'graphql';
// abstract pq não vamos precisar instanciar essa classe diretamente
export abstract class BaseService {

  protected readAndWriteQuery<T = any>(
    config: {
      store: DataProxy,
      newRecord: T, // Novo registro a ser criado, que pode ser chat, message, etc
      query: DocumentNode,
      queryName: string,
      arrayOperation: 'push' | 'unshift' | 'singleRecord',
        // push: coloca o registro no final do array
        // unshift: coloca o registro no início do array
        // singleRecord: apenas coloca o registro no array
      variables?: { [key: string]: any }
    }
  ): void {

    try {
      const data = config.store.readQuery({
        query: config.query,
        variables: config.variables
      });

      switch (config.arrayOperation) {
        case 'push':
        case 'unshift':
          data[config.queryName] = [...data[config.queryName]];
          data[config.queryName][config.arrayOperation](config.newRecord);
          // ex: data.allChats.push()
          break;
        case 'singleRecord':
          data[config.queryName] = [config.newRecord];
      }

      config.store.writeQuery({
        query: config.query,
        variables: config.variables,
        data
      });
    } catch (e) {
      console.log(`Query ${config.queryName} not found in cache!`);
    }
  }
}

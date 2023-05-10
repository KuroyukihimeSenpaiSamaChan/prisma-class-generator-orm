export const CONST_TEMPLATES = {
  RELATION_MANY: `
  import { PrismaClass } from './prisma-class'
  import { PrismaModel } from './prisma-model'

  export class RelationMany<R extends PrismaClass>
    implements PrismaClass, Iterable<R>
  {
    private _toRemoveRelations: R[] = []
    constructor(private relations: R[] = []) { }

    [Symbol.iterator](): RelationIterator<R> {
      return new RelationIterator<R>(this.relations)
    }

    length(): number {
      return this.relations.length
    }

    get(index: number): R {
      if (index < 0 || index >= this.relations.length) {
        throw new RangeError('Index out of range')
      }

      return this.relations[index]
    }

    push(value: R)
    push(values: R[])
    push(value: R | R[]) {
      if (Array.isArray(value)) {
        for (const val of value) {
          this.relations.push(val)
        }
      } else {
        this.relations.push(value)
      }
    }

    reduce<Accumulator>(
      callback: (acc: Accumulator, elem: R) => Accumulator,
      accumulator: Accumulator,
    ): Accumulator {
      return this.relations.reduce(callback, accumulator)
    }

    remove(index: number): R | null {
      if (index < 0 || index >= this.relations.length) {
        return null
      }

      const relation = this.relations.splice(index, 1)[0]
      this._toRemoveRelations.push(relation)
      return relation
    }

    clear() {
      while (this.length() > 0) {
        this.remove(0)
      }
    }

    replace(values: R[]) {
      this.clear()
      this.push(values)
    }

    get toRemoveRelations(): R[] {
      return this._toRemoveRelations
    }

    toJSON() {
      return this.relations
    }

    async load(depth: number = 0) {
      for (const relation of this.relations) {
        relation.load(depth)
      }
    }

    async save() {
      try {
        for (const relation of this.relations) {
          await relation.save()
        }
      } catch (err) {
        console.log(err)
        return false
      }
      return true
    }

    async *saveToTransaction(
      tx: Parameters<
        Parameters<typeof PrismaModel.prismaClient.$transaction>[0]
      >[0],
    ) {
      const saveYieldsArray: AsyncGenerator<number, number, unknown>[] = []

      for (const relation of this.relations) {
        const saveYield = relation.saveToTransaction(tx)
        await saveYield.next()
        saveYieldsArray.push(saveYield)
      }
      yield new Promise<number>((resolve) => resolve(0))

      for (const saveYield of saveYieldsArray) {
        saveYield.next()
      }
      return new Promise<number>((resolve) => resolve(1))
    }
  }

  class RelationIterator<R> implements Iterator<R> {
    private index: number
    private done: boolean

    constructor(private values: R[]) {
      this.index = 0
      this.done = false
    }

    next(...args: [] | [undefined]): IteratorResult<R, number | undefined> {
      if (this.done) {
        return {
          done: true,
          value: undefined,
        }
      }

      if (this.index === this.values.length) {
        this.done = true
        return {
          done: true,
          value: this.index,
        }
      }

      const value = this.values[this.index]
      this.index += 1

      return {
        done: false,
        value,
      }
    }
    // return?(value?: any): IteratorResult<R, any> {
    //   throw new Error('Method not implemented.')
    // }
    // throw?(e?: any): IteratorResult<R, any> {
    //   throw new Error('Method not implemented.')
    // }
  }

  `,

  PRISMA_CLASS: `import { PrismaModel } from "./prisma-model"

  export interface PrismaClass {
    load(
      param?:
        | number
        | any,
    ): Promise<void>
    save(): Promise<boolean>
    saveToTransaction(tx: Parameters<Parameters<typeof PrismaModel.prismaClient.$transaction>[0]>[0]): AsyncGenerator<number, number, unknown>
  }
  
  export type ForeignKey = number | -1 
  `,
}
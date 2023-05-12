import { PrismaClass } from './prisma-class'
import { PrismaModel } from './prisma-model'

export class RelationMany<R extends PrismaClass>
	implements PrismaClass, Iterable<R>
{
	private _isSaved = false
	get isSaved(): boolean {
		return this._isSaved
	}

	get primaryKey(): number {
		return 0
	}

	private _toRemoveRelations: R[] = []
	constructor(private relations: R[] = []) {
		this._isSaved = true
	}

	[Symbol.iterator](): RelationIterator<R> {
		return new RelationIterator<R>(this.relations)
	}

	get length(): number {
		return this.relations.length
	}

	get(index: number): R {
		if (index < 0 || index >= this.relations.length) {
			throw new RangeError('Index out of range')
		}

		return this.relations[index]
	}

	findByPrimaryKey(primaryKey: number): R | null {
		for (const relation of this.relations) {
			if (primaryKey === relation.primaryKey) {
				return relation
			}
		}
		return null
	}

	push(value: R): void
	push(values: R[]): void
	push(value: R | R[]): void {
		if (Array.isArray(value)) {
			for (const val of value) {
				if (this.findByPrimaryKey(val.primaryKey) === null) {
					this.relations.push(val)
					this._isSaved = false
				}
			}
		} else if (this.findByPrimaryKey(value.primaryKey) === null) {
			this.relations.push(value)
			this._isSaved = false
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
		this._isSaved = false
		return relation
	}

	clear() {
		while (this.length > 0) {
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
			await saveYield.next()
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

import { PrismaClass } from './prisma-class'

export class RelationMany<R extends PrismaClass>
	extends PrismaClass
	implements Iterable<R>
{
	constructor(private relations: R[]) {
		super()
	}

	[Symbol.iterator](): RelationIterator<R> {
		return new RelationIterator<R>(this.relations)
	}

	length(): number {
		return this.relations.length
	}

	get(index: number): R {
		return this.relations[index]
	}

	push(value: R | R[]) {
		if (Array.isArray(value)) {
			for (const val of value) {
				this.relations.push(val)
			}
		} else {
			this.relations.push(value)
		}
	}

	remove(index: number): R {
		return this.relations.splice(index, 1)[0]
	}

	async load(depth: number) {
		for (const relation of this.relations) {
			relation.load(depth - 1)
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

	async *saveToTransaction(tx) {
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
	return?(value?: any): IteratorResult<R, any> {
		throw new Error('Method not implemented.')
	}
	throw?(e?: any): IteratorResult<R, any> {
		throw new Error('Method not implemented.')
	}
}
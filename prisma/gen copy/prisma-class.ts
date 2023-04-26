export abstract class PrismaClass {
	// protected static saveToTransaction = Symbol("saveToTransaction")
	abstract load(depth: number): Promise<void>
	abstract save(): Promise<boolean>
	abstract saveToTransaction(tx): AsyncGenerator<number, number, unknown>
}

export type ForeignKey = number | -1 | null

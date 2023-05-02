import { PrismaModel } from './prisma-model'

export abstract class PrismaClass {
	// protected static saveToTransaction = Symbol("saveToTransaction")
	abstract load(depth: number): Promise<void>
	abstract save(): Promise<boolean>
	abstract saveToTransaction(
		tx: Parameters<
			Parameters<typeof PrismaModel.prismaClient.$transaction>[0]
		>[0],
	): AsyncGenerator<number, number, unknown>
}

export type ForeignKey = number | -1 | null

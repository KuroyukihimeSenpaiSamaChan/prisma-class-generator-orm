import { PrismaModel } from './prisma-model'

export interface PrismaClass {
	load(param?: number | any): Promise<void>
	isSaved: boolean
	save(): Promise<boolean>
	saveToTransaction(
		tx: Parameters<
			Parameters<typeof PrismaModel.prismaClient.$transaction>[0]
		>[0],
	): AsyncGenerator<number, number, unknown>
}

export type ForeignKey = number | -1

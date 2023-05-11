import { _User } from './User'
import { Prisma, User } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

type _UserDeleteConstructor<
	userType extends ForeignKey | undefined = ForeignKey | undefined,
> = {
	id?: number
	token: string
	date: number
	validated?: boolean
} & (userType extends ForeignKey
	? {
			user_id: ForeignKey
			user?: User | _User
	  }
	: {
			user_id?: ForeignKey
			user: User | _User
	  })

export class _UserDelete implements PrismaClass {
	static prisma: Prisma.UserDeleteDelegate<undefined>
	get prisma(): Prisma.UserDeleteDelegate<undefined> {
		return _UserDelete.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	private _isSaved = false
	get isSaved(): boolean {
		return this._isSaved
	}

	static getIncludes(
		param?:
			| number
			| {
					user?:
						| boolean
						| Exclude<
								Parameters<typeof _User.getIncludes>[0],
								number
						  >
			  },
	): Prisma.UserDeleteInclude {
		if (param === undefined) {
			param = 0
		}

		if (typeof param === 'number') {
			if (param <= 0) {
				return {
					user: true,
				}
			}
			return {
				user: { include: _User.getIncludes(param - 1) },
			}
		} else {
			if (Object.keys(param).length === 0) {
				return {}
			}

			const query = {
				user: Object.keys(param).includes('user')
					? typeof param.user === 'boolean'
						? true
						: {
								include: _User.getIncludes(param.user),
						  }
					: undefined,
			}

			// @ts-ignore
			Object.keys(query).forEach(
				(key) =>
					query[key as keyof typeof query] === undefined &&
					delete query[key as keyof typeof query],
			)

			return query
		}
	}

	// ID
	private _id: number = -1
	get id(): number {
		return this._id
	}
	get primaryKey(): number {
		return this._id
	}

	private _user_id: ForeignKey
	set user_id(value: ForeignKey) {
		this._user_id = value
		this._isSaved = false
	}

	private _token: string
	set token(value: string) {
		this._token = value
		this._isSaved = false
	}
	get token(): string {
		return this._token
	}

	private _date: number
	set date(value: number) {
		this._date = value
		this._isSaved = false
	}
	get date(): number {
		return this._date
	}

	private _validated: boolean = false
	set validated(value: boolean) {
		this._validated = value
		this._isSaved = false
	}
	get validated(): boolean {
		return this._validated
	}

	private _user: _User
	get user(): _User {
		return this._user
	}
	set user(value: _User) {
		this._user = value
		this._user_id = value.id
		this._isSaved = false
	}
	get user_id(): ForeignKey {
		if (!this._user) {
			return this._user_id
		} else {
			return this._user.primaryKey
		}
	}

	constructor(obj: _UserDeleteConstructor) {
		this.init(obj)
	}

	private init(obj: _UserDeleteConstructor) {
		this._token = obj.token
		this._date = obj.date
		this._validated = obj.validated ?? false

		if (obj.user !== undefined) {
			if (obj.user instanceof _User) {
				this.user = obj.user
			} else {
				this.user = new _User(obj.user)
			}
		} else if (obj.user_id !== undefined) {
			this._user_id = obj.user_id
		} else throw new Error('Invalid constructor.')

		if (obj.id !== undefined) {
			this._id = obj.id
			this._isSaved = true
		}
	}

	update(obj: { token?: string; date?: number; validated?: boolean }) {
		if (obj.token !== undefined) {
			this.token = obj.token
		}
		if (obj.date !== undefined) {
			this.date = obj.date
		}
		if (obj.validated !== undefined) {
			this.validated = obj.validated
		}
	}

	toJSON() {
		return {
			id: this.id,
			user_id: this.user_id,
			token: this.token,
			date: this.date,
			validated: this.validated,
			user: this.user,
		}
	}
	nonRelationsToJSON() {
		return {
			id: this.id!,
			user_id: this.user_id!,
			token: this.token!,
			date: this.date!,
			validated: this.validated!,
		}
	}

	static async all(
		query?: Prisma.UserDeleteFindFirstArgsBase,
	): Promise<_UserDelete[]> {
		const models = await _UserDelete.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _UserDelete(m))
			return acc
		}, [] as _UserDelete[])
	}

	static async from(
		query?: Prisma.UserDeleteFindFirstArgsBase,
	): Promise<_UserDelete | null> {
		const dbQuery = await _UserDelete.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _UserDelete(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<Parameters<typeof _UserDelete.getIncludes>[0], number>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<Parameters<typeof _UserDelete.getIncludes>[0], number>,
	): Promise<void> {
		if (param === undefined) {
			param = 0
		}

		if (
			(typeof param === 'number' && param < 0) ||
			(typeof param === 'object' && Object.keys(param).length === 0)
		) {
			return
		}

		if (this.id !== -1) {
			const dbThis = await _UserDelete.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _UserDelete.getIncludes(param),
			})
			if (dbThis !== null) {
				this.init({ ...this.toJSON(), ...dbThis })
			}
		}
	}

	async save(): Promise<boolean> {
		try {
			await this.prismaClient.$transaction(
				async (tx): Promise<number> => {
					const saveYield = this.saveToTransaction(tx)
					await saveYield.next()
					return (await saveYield.next()).value
				},
			)
		} catch (err) {
			console.log(err)
			return false
		}
		return true
	}

	private _saving: boolean = false
	get saving(): boolean {
		return this._saving
	}
	async *saveToTransaction(
		tx: Parameters<Parameters<typeof this.prismaClient.$transaction>[0]>[0],
	) {
		this._saving = true

		this.checkRequiredFields()

		const saveYieldsArray: AsyncGenerator<number, number, unknown>[] = []

		// Relations toOne
		if (this.user && !this.user.saving) {
			const userYield = this.user!.saveToTransaction(tx)
			await userYield.next()
			saveYieldsArray.push(userYield)
		}

		// Relations toMany

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		if (this._isSaved) {
			this._saving = false
			return new Promise<number>((resolve) => resolve(this._id))
		}

		if (this._id === -1) {
			this._id = (
				await tx.userDelete.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.userDelete.update({
				where: { id: this._id },
				data: {
					...this.nonRelationsToJSON(),
				},
			})
		}

		this._saving = false
		this._isSaved = true
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {}

	static async deleteAll(
		query: Parameters<typeof _UserDelete.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _UserDelete.prisma.deleteMany(query)).count
		} catch (e) {
			console.log(e)
			return false
		}
		return count
	}

	async delete(): Promise<boolean> {
		if (this.primaryKey === -1) return false

		try {
			await this.prisma.delete({
				where: { id: this._id },
			})
			this._id = -1
		} catch (e) {
			console.log(e)
			return false
		}
		return true
	}
}

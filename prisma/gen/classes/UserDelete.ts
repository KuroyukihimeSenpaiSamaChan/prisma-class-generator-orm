import { _User } from './User'
import { Prisma, User } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _UserDelete extends PrismaClass {
	static prisma: Prisma.UserDeleteDelegate<undefined>
	get prisma(): Prisma.UserDeleteDelegate<undefined> {
		return _UserDelete.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.UserDeleteInclude {
		if (deep <= 0) {
			return {
				user: true,
			}
		}

		return {
			user: { include: _User.getIncludes(deep - 1) },
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

	token?: string

	date?: number

	validated?: boolean = false

	private _user: _User | null
	get user(): _User | ForeignKey {
		return this._user ? this._user : this.user_id
	}
	set user(value: _User | ForeignKey) {
		if (value instanceof _User) {
			this._user = value
			this._user_id = value.id
		} else {
			this._user = null
			this._user_id = value
		}
	}
	get user_id(): ForeignKey {
		if (this._user === null) {
			return this._user_id
		} else {
			return this._user.primaryKey
		}
	}

	constructor(obj: {
		id?: number
		user_id?: ForeignKey
		token?: string
		date?: number
		validated?: boolean
		user?: _User | User | ForeignKey
	}) {
		super()
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _UserDelete>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.token = obj.token
		this.date = obj.date
		this.validated = obj.validated !== undefined ? obj.validated : false

		if (!obj.user) {
			if (obj.user_id === undefined) {
				this.user = null
			} else {
				this.user = obj.user_id
			}
		} else if (obj.user instanceof _User) {
			this.user = obj.user
		} else if (typeof obj.user === 'number') {
			this.user = obj.user
		} else {
			this.user = new _User(obj.user)
		}
	}

	update(obj: {
		id?: number
		user_id?: ForeignKey
		token?: string
		date?: number
		validated?: boolean
	}) {
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
		includes: boolean = true,
	): Promise<_UserDelete | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _UserDelete.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _UserDelete.getIncludes()
			}
		}

		const dbQuery = await _UserDelete.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _UserDelete(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _UserDelete.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _UserDelete.getIncludes(depth),
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
		if (typeof this.user !== 'number' && !this.user!.saving) {
			const userYield = this.user!.saveToTransaction(tx)
			await userYield.next()
			saveYieldsArray.push(userYield)
		}

		// Relations toMany

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
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
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.token === undefined) {
			throw new Error('Missing field on _UserDelete.save(): token')
		}
		if (this.date === undefined) {
			throw new Error('Missing field on _UserDelete.save(): date')
		}
		if (this.validated === undefined) {
			throw new Error('Missing field on _UserDelete.save(): validated')
		}

		if (this.user === undefined || this.user === null) {
			throw new Error("user can't be null or undefined in _UserDelete.")
		}
	}

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

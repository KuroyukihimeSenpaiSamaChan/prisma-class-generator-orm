import { _User } from './User'
import { Prisma, User } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

type _AccessTokenConstructor<userType extends ForeignKey | undefined> = {
	id?: number
	token: string
	created_at?: number | null
	expires_at?: number | null
} & (userType extends ForeignKey
	? {
			user_id: ForeignKey
			user?: User | _User
	  }
	: {
			user_id?: ForeignKey
			user: User | _User
	  })

export class _AccessToken implements PrismaClass {
	static prisma: Prisma.AccessTokenDelegate<undefined>
	get prisma(): Prisma.AccessTokenDelegate<undefined> {
		return _AccessToken.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
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
	): Prisma.AccessTokenInclude {
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

			return {
				user: Object.keys(param).includes('user')
					? typeof param.user === 'boolean'
						? true
						: {
								include: _User.getIncludes(param.user),
						  }
					: undefined,
			}
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

	token: string

	created_at: number | null

	expires_at: number | null

	private _user: _User
	get user(): _User {
		return this._user
	}
	set user(value: _User) {
		this._user = value
		this._user_id = value.id
	}
	get user_id(): ForeignKey {
		if (this._user === undefined) {
			return this._user_id
		} else {
			return this._user.primaryKey
		}
	}

	constructor(obj: _AccessTokenConstructor<ForeignKey | undefined>) {
		this.init(obj)
	}

	private init(obj: _AccessTokenConstructor<ForeignKey | undefined>) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.token = obj.token
		this.created_at = obj.created_at ?? null
		this.expires_at = obj.expires_at ?? null

		if (obj.user !== undefined) {
			if (obj.user instanceof _User) {
				this.user = obj.user
			} else {
				this.user = new _User(obj.user)
			}
		} else if (obj.user_id !== undefined) {
			this._user_id = obj.user_id
		} else throw new Error('Invalid constructor.')
	}

	update(obj: {
		token?: string
		created_at?: number | null
		expires_at?: number | null
	}) {
		if (obj.token !== undefined) {
			this.token = obj.token
		}
		if (obj.created_at !== undefined) {
			this.created_at = obj.created_at
		}
		if (obj.expires_at !== undefined) {
			this.expires_at = obj.expires_at
		}
	}

	toJSON() {
		return {
			id: this.id,
			user_id: this.user_id,
			token: this.token,
			created_at: this.created_at,
			expires_at: this.expires_at,
			user: this.user,
		}
	}
	nonRelationsToJSON() {
		return {
			id: this.id!,
			user_id: this.user_id!,
			token: this.token!,
			created_at: this.created_at!,
			expires_at: this.expires_at!,
		}
	}

	static async all(
		query?: Prisma.AccessTokenFindFirstArgsBase,
	): Promise<_AccessToken[]> {
		const models = await _AccessToken.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _AccessToken(m))
			return acc
		}, [] as _AccessToken[])
	}

	static async from(
		query?: Prisma.AccessTokenFindFirstArgsBase,
		includes: boolean = true,
	): Promise<_AccessToken | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _AccessToken.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _AccessToken.getIncludes()
			}
		}

		const dbQuery = await _AccessToken.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _AccessToken(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<
			Parameters<typeof _AccessToken.getIncludes>[0],
			number
		>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<Parameters<typeof _AccessToken.getIncludes>[0], number>,
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
			const dbThis = await _AccessToken.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _AccessToken.getIncludes(param),
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
				await tx.accessToken.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.accessToken.update({
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
			throw new Error('Missing field on _AccessToken.save(): token')
		}

		if (this.user === undefined || this.user === null) {
			throw new Error("user can't be null or undefined in _AccessToken.")
		}
	}

	static async deleteAll(
		query: Parameters<typeof _AccessToken.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _AccessToken.prisma.deleteMany(query)).count
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

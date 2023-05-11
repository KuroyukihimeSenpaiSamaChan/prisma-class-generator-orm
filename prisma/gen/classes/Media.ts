import { _User } from './User'
import { _Product } from './Product'
import { Prisma, User, Product } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

type _MediaConstructor<
	userType extends ForeignKey | undefined = ForeignKey | undefined,
> = {
	id?: number
	url: string
	creation_date: number
	modification_date: number
	description?: string
	name: string
	product_image?: _Product[] | Product[] | RelationMany<_Product>
	product_gallery?: _Product[] | Product[] | RelationMany<_Product>
} & (userType extends ForeignKey
	? {
			user_id: ForeignKey
			user?: User | _User
	  }
	: {
			user_id?: ForeignKey
			user: User | _User
	  })

export class _Media implements PrismaClass {
	static prisma: Prisma.MediaDelegate<undefined>
	get prisma(): Prisma.MediaDelegate<undefined> {
		return _Media.prisma
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
					product_image?:
						| boolean
						| Exclude<
								Parameters<typeof _Product.getIncludes>[0],
								number
						  >
					product_gallery?:
						| boolean
						| Exclude<
								Parameters<typeof _Product.getIncludes>[0],
								number
						  >
			  },
	): Prisma.MediaInclude {
		if (param === undefined) {
			param = 0
		}

		if (typeof param === 'number') {
			if (param <= 0) {
				return {
					user: true,
					product_image: true,
					product_gallery: true,
				}
			}
			return {
				user: { include: _User.getIncludes(param - 1) },
				product_image: { include: _Product.getIncludes(param - 1) },
				product_gallery: { include: _Product.getIncludes(param - 1) },
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
				product_image: Object.keys(param).includes('product_image')
					? typeof param.product_image === 'boolean'
						? true
						: {
								include: _Product.getIncludes(
									param.product_image,
								),
						  }
					: undefined,
				product_gallery: Object.keys(param).includes('product_gallery')
					? typeof param.product_gallery === 'boolean'
						? true
						: {
								include: _Product.getIncludes(
									param.product_gallery,
								),
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

	private _url: string
	set url(value: string) {
		this._url = value
		this._isSaved = false
	}

	private _creation_date: number
	set creation_date(value: number) {
		this._creation_date = value
		this._isSaved = false
	}

	private _modification_date: number
	set modification_date(value: number) {
		this._modification_date = value
		this._isSaved = false
	}

	private _user_id: ForeignKey
	set user_id(value: ForeignKey) {
		this._user_id = value
		this._isSaved = false
	}

	private _description: string = ''
	set description(value: string) {
		this._description = value
		this._isSaved = false
	}

	private _name: string
	set name(value: string) {
		this._name = value
		this._isSaved = false
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

	private _product_image: RelationMany<_Product>
	public get product_image(): RelationMany<_Product> {
		return this._product_image
	}
	private set product_image(value: RelationMany<_Product>) {
		this._product_image = value
		this._isSaved = false
	}

	private _product_gallery: RelationMany<_Product>
	public get product_gallery(): RelationMany<_Product> {
		return this._product_gallery
	}
	private set product_gallery(value: RelationMany<_Product>) {
		this._product_gallery = value
		this._isSaved = false
	}

	constructor(obj: _MediaConstructor) {
		this.init(obj)
	}

	private init(obj: _MediaConstructor) {
		this._url = obj.url
		this._creation_date = obj.creation_date
		this._modification_date = obj.modification_date
		this._description = obj.description ?? ''
		this._name = obj.name

		if (obj.user !== undefined) {
			if (obj.user instanceof _User) {
				this.user = obj.user
			} else {
				this.user = new _User(obj.user)
			}
		} else if (obj.user_id !== undefined) {
			this._user_id = obj.user_id
		} else throw new Error('Invalid constructor.')

		if (!obj.product_image || obj.product_image.length === 0) {
			this.product_image = new RelationMany<_Product>()
		} else if (obj.product_image instanceof RelationMany) {
			this.product_image = obj.product_image
		} else if (obj.product_image[0] instanceof _Product) {
			this.product_image = new RelationMany<_Product>(
				obj.product_image as _Product[],
			)
		} else {
			const product_imageArray: _Product[] = []
			for (const value of obj.product_image as Product[]) {
				product_imageArray.push(new _Product(value))
			}
			this.product_image = new RelationMany<_Product>(product_imageArray)
		}

		if (!obj.product_gallery || obj.product_gallery.length === 0) {
			this.product_gallery = new RelationMany<_Product>()
		} else if (obj.product_gallery instanceof RelationMany) {
			this.product_gallery = obj.product_gallery
		} else if (obj.product_gallery[0] instanceof _Product) {
			this.product_gallery = new RelationMany<_Product>(
				obj.product_gallery as _Product[],
			)
		} else {
			const product_galleryArray: _Product[] = []
			for (const value of obj.product_gallery as Product[]) {
				product_galleryArray.push(new _Product(value))
			}
			this.product_gallery = new RelationMany<_Product>(
				product_galleryArray,
			)
		}

		if (obj.id !== undefined) {
			this._id = obj.id
			this._isSaved = true
		}
	}

	update(obj: {
		url?: string
		creation_date?: number
		modification_date?: number
		description?: string
		name?: string
	}) {
		if (obj.url !== undefined) {
			this.url = obj.url
		}
		if (obj.creation_date !== undefined) {
			this.creation_date = obj.creation_date
		}
		if (obj.modification_date !== undefined) {
			this.modification_date = obj.modification_date
		}
		if (obj.description !== undefined) {
			this.description = obj.description
		}
		if (obj.name !== undefined) {
			this.name = obj.name
		}
	}

	toJSON() {
		return {
			id: this.id,
			url: this.url,
			creation_date: this.creation_date,
			modification_date: this.modification_date,
			user_id: this.user_id,
			description: this.description,
			name: this.name,
			user: this.user,
			product_image: this.product_image,
			product_gallery: this.product_gallery,
		}
	}
	nonRelationsToJSON() {
		return {
			id: this.id!,
			url: this.url!,
			creation_date: this.creation_date!,
			modification_date: this.modification_date!,
			user_id: this.user_id!,
			description: this.description!,
			name: this.name!,
		}
	}

	static async all(query?: Prisma.MediaFindFirstArgsBase): Promise<_Media[]> {
		const models = await _Media.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _Media(m))
			return acc
		}, [] as _Media[])
	}

	static async from(
		query?: Prisma.MediaFindFirstArgsBase,
	): Promise<_Media | null> {
		const dbQuery = await _Media.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _Media(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<Parameters<typeof _Media.getIncludes>[0], number>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<Parameters<typeof _Media.getIncludes>[0], number>,
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
			const dbThis = await _Media.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _Media.getIncludes(param),
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
		const product_imageYield = this.product_image!.saveToTransaction(tx)
		await product_imageYield.next()
		saveYieldsArray.push(product_imageYield)

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		if (this._isSaved) {
			this._saving = false
			return new Promise<number>((resolve) => resolve(this._id))
		}

		const product_galleryConnections: Prisma.Enumerable<Prisma.ProductWhereUniqueInput> =
			[]
		for (const relation of this.product_gallery) {
			product_galleryConnections.push({
				id: relation.primaryKey,
			})
		}
		const product_galleryDisconnections: Prisma.Enumerable<Prisma.ProductWhereUniqueInput> =
			[]
		for (const relation of this.product_gallery.toRemoveRelations) {
			product_galleryConnections.push({
				id: relation.primaryKey,
			})
		}

		if (this._id === -1) {
			this._id = (
				await tx.media.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
						product_gallery: {
							connect: product_galleryConnections,
						},
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.media.update({
				where: { id: this._id },
				data: {
					...this.nonRelationsToJSON(),
					product_gallery: {
						connect: product_galleryConnections,
						disconnect: product_galleryDisconnections,
					},
				},
			})
		}

		this._saving = false
		this._isSaved = true
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.product_image.length > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _Media. Save it first, then add the toMany fields",
			)
		}
	}

	static async deleteAll(
		query: Parameters<typeof _Media.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _Media.prisma.deleteMany(query)).count
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

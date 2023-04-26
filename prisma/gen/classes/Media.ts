import { _User } from './User'
import { _Product } from './Product'
import { Prisma, User, Product } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _Media extends PrismaClass {
	static prisma: Prisma.MediaDelegate<undefined>
	get prisma(): Prisma.MediaDelegate<undefined> {
		return _Media.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.MediaInclude {
		if (deep <= 0) {
			return {
				user: true,
				product_image: true,
				product_gallery: true,
			}
		}

		return {
			user: { include: _User.getIncludes(deep - 1) },
			product_image: { include: _Product.getIncludes(deep - 1) },
			product_gallery: { include: _Product.getIncludes(deep - 1) },
		}
	}

	// ID
	private _id: number
	get id(): number {
		return this._id
	}
	get primaryKey(): number {
		return this._id
	}

	slug?: string

	url?: string

	creation_date?: number

	modification_date?: number

	private user_id: ForeignKey

	private _user: _User | null
	get user(): _User | ForeignKey {
		return this._user ? this._user : this.user_id
	}
	set user(value: _User | ForeignKey) {
		if (value instanceof _User) {
			this._user = value
			this.user_id = value.id
		} else {
			this._user = null
			this.user_id = value
		}
	}

	private _product_image: RelationMany<_Product>
	public get product_image(): RelationMany<_Product> {
		return this._product_image
	}
	private set product_image(value: RelationMany<_Product>) {
		this._product_image = value
	}

	private _product_gallery: RelationMany<_Product>
	public get product_gallery(): RelationMany<_Product> {
		return this._product_gallery
	}
	private set product_gallery(value: RelationMany<_Product>) {
		this._product_gallery = value
	}

	constructor(obj: {
		id?: number
		slug?: string
		url?: string
		creation_date?: number
		modification_date?: number
		user_id?: ForeignKey
		user?: _User | User | ForeignKey
		product_image?: _Product[] | Product[] | RelationMany<_Product>
		product_gallery?: _Product[] | Product[] | RelationMany<_Product>
	}) {
		super()
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _Media>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.slug = obj.slug
		this.url = obj.url
		this.creation_date = obj.creation_date
		this.modification_date = obj.modification_date

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

		if (!obj.product_image || obj.product_image.length === 0) {
			this.product_image = new RelationMany<_Product>([])
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
			this.product_gallery = new RelationMany<_Product>([])
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
	}

	toJSON() {
		return {
			id: this.id,
			slug: this.slug,
			url: this.url,
			creation_date: this.creation_date,
			modification_date: this.modification_date,
			user_id: this.user_id,
			user: this.user,
			product_image: this.product_image,
			product_gallery: this.product_gallery,
		}
	}

	static async all(query: Prisma.MediaFindFirstArgsBase): Promise<_Media[]> {
		const models = await _Media.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _Media(m))
			return acc
		}, [] as _Media[])
	}

	static async from<F extends Prisma.MediaWhereUniqueInput>(
		where: F,
		opt?: Omit<Prisma.MediaFindUniqueArgsBase, 'where'>,
	): Promise<_Media | null> {
		let prismaOptions = opt
		if (prismaOptions === undefined) {
			prismaOptions = {
				include: _Media.getIncludes(),
			}
		} else if (
			prismaOptions.include === undefined &&
			prismaOptions.select === undefined
		) {
			prismaOptions.include = _Media.getIncludes()
		}

		const dbQuery = await _Media.prisma.findFirst({
			where: where,
			...opt,
		})

		if (dbQuery === null) return null

		return new _Media(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _Media.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _Media.getIncludes(depth),
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
					console.log('First YIELD')
					await saveYield.next()
					console.log('Second YIELD')
					return (await saveYield.next()).value
				},
			)
		} catch (err) {
			console.log(err)
			return false
		}
		return true
	}

	async *saveToTransaction(
		tx: Parameters<Parameters<typeof this.prismaClient.$transaction>[0]>[0],
	) {
		//
		if (this.id === undefined) {
			throw new Error('Invalid field on _Media.save(): id')
		}

		if (this.slug === undefined) {
			throw new Error('Invalid field on _Media.save(): slug')
		}

		if (this.url === undefined) {
			throw new Error('Invalid field on _Media.save(): url')
		}

		if (this.creation_date === undefined) {
			throw new Error('Invalid field on _Media.save(): creation_date')
		}

		if (this.modification_date === undefined) {
			throw new Error('Invalid field on _Media.save(): modification_date')
		}

		if (this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on _Media. Save it first, then add the toMany fields",
			)
		}

		const saveYieldsArray: AsyncGenerator<number, number, unknown>[] = []

		// toOne
		// if (this.media !== null && typeof this.media !== 'number') {
		//   const mediaYield = this.media.saveToTransaction(tx)
		//   await mediaYield.next()
		//   saveYieldsArray.push(mediaYield)
		// }

		// toMany
		// const galleryYield = this.gallery.saveToTransaction(tx)
		// galleryYield.next()
		// saveYieldsArray.push(galleryYield)

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			saveYield.next()
		}

		return new Promise<number>((resolve) => resolve(1))
	}
}

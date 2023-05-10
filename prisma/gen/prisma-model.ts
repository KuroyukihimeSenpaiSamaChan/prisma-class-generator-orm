import { PrismaClient } from '@prisma/client'
import { _AccessToken } from './classes/AccessToken'
import { _User } from './classes/User'
import { _Role } from './classes/Role'
import { _UserDelete } from './classes/UserDelete'
import { _UserBilling } from './classes/UserBilling'
import { _UserDelivery } from './classes/UserDelivery'
import { _Expedition } from './classes/Expedition'
import { _Media } from './classes/Media'
import { _Order } from './classes/Order'
import { _Product } from './classes/Product'
import { _ProductCategory } from './classes/ProductCategory'
import { _ProductVisibility } from './classes/ProductVisibility'
import { _ProductState } from './classes/ProductState'
import { _ConditioningType } from './classes/ConditioningType'
import { _SubOrder } from './classes/SubOrder'
import { _TVAType } from './classes/TVAType'
import { _Cart } from './classes/Cart'
import { _CartProduct } from './classes/CartProduct'

export abstract class PrismaModel {
	static prismaClient: PrismaClient

	static async init() {
		if (PrismaModel.prismaClient !== undefined) return
		// @ts-ignore
		BigInt.prototype.toJSON = (): string => {
			return this.toString()
		}

		PrismaModel.prismaClient = new PrismaClient()
		await PrismaModel.prismaClient.$connect()

		_AccessToken.prisma = PrismaModel.prismaClient.accessToken
		_User.prisma = PrismaModel.prismaClient.user
		_Role.prisma = PrismaModel.prismaClient.role
		_UserDelete.prisma = PrismaModel.prismaClient.userDelete
		_UserBilling.prisma = PrismaModel.prismaClient.userBilling
		_UserDelivery.prisma = PrismaModel.prismaClient.userDelivery
		_Expedition.prisma = PrismaModel.prismaClient.expedition
		_Media.prisma = PrismaModel.prismaClient.media
		_Order.prisma = PrismaModel.prismaClient.order
		_Product.prisma = PrismaModel.prismaClient.product
		_ProductCategory.prisma = PrismaModel.prismaClient.productCategory
		_ProductVisibility.prisma = PrismaModel.prismaClient.productVisibility
		_ProductState.prisma = PrismaModel.prismaClient.productState
		_ConditioningType.prisma = PrismaModel.prismaClient.conditioningType
		_SubOrder.prisma = PrismaModel.prismaClient.subOrder
		_TVAType.prisma = PrismaModel.prismaClient.tVAType
		_Cart.prisma = PrismaModel.prismaClient.cart
		_CartProduct.prisma = PrismaModel.prismaClient.cartProduct

		await _Role.initList()
		await _Expedition.initList()
		await _ProductCategory.initList()
		await _ProductVisibility.initList()
		await _ProductState.initList()
		await _ConditioningType.initList()
		await _TVAType.initList()
	}
}

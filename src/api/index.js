import request from '@/http/request';

const getSeller = request.get('api/seller')
const getGoods = request.get('api/goods')
const getRatings = request.get('api/ratings')


export {
    getSeller,
    getGoods,
    getRatings
}
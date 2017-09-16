import React, {Component} from 'react';
import {Grid} from 'antd-mobile';

class CategoryCarousel extends Component {
    constructor(props) {
        super(props);
        const category = [
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'dessert',
                text: '甜品'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'deliciousFood',
                text: '美食'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'newStore',
                text: '新店特惠'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'flower',
                text: '鲜花'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'porridge',
                text: '粥店'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'cake',
                text: '蛋糕'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                key: 'breakfast',
                text: '预定早餐'
            }
        ];
        this.state = {
            categoryData: category
        };
    }

    handleCategoryClick = (el, index) => {
        console.log(el);
    }

    render() {
        let self = this;
        const {categoryData} = self.state;
        return (
            <Grid
                className='category-carousel'
                data={categoryData}
                columnNum={4}
                hasLine={false}
                isCarousel={true}
                carouselMaxRow={2}
                autoplay
                infinite
                autoplayInterval={3000}
                onClick={self.handleCategoryClick}
            />
        );
    }
}

export default CategoryCarousel;

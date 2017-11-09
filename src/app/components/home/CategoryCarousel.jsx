import React, {Component} from 'react';
import {Grid} from 'antd-mobile';

class CategoryCarousel extends Component {
    constructor(props) {
        super(props);
        const category = [
            {
                icon: 'https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg',
                key: 'dessert',
                text: '甜品'
            },
            {
                icon: 'https://fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg',
                key: 'deliciousFood',
                text: '美食'
            },
            {
                icon: 'https://fuss10.elemecdn.com/a/fa/d41b04d520d445dc5de42dae9a384jpeg.jpeg',
                key: 'newStore',
                text: '新店特惠'
            },
            {
                icon: 'https://fuss10.elemecdn.com/8/83/171fd98b85dee3b3f4243b7459b48jpeg.jpeg',
                key: 'flower',
                text: '鲜花'
            },
            {
                icon: 'https://fuss10.elemecdn.com/2/17/244241b514affc0f12f4168cf6628jpeg.jpeg',
                key: 'porridge',
                text: '粥店'
            },
            {
                icon: 'https://fuss10.elemecdn.com/3/84/8e031bf7b3c036b4ec19edff16e46jpeg.jpeg',
                key: 'cake',
                text: '蛋糕'
            },
            {
                icon: 'https://fuss10.elemecdn.com/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://fuss10.elemecdn.com/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://fuss10.elemecdn.com/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://fuss10.elemecdn.com/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://fuss10.elemecdn.com/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://fuss10.elemecdn.com/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://fuss10.elemecdn.com/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://fuss10.elemecdn.com/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://fuss10.elemecdn.com/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg',
                key: 'breakfast',
                text: '预定早餐'
            },
            {
                icon: 'https://fuss10.elemecdn.com/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg',
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

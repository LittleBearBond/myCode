export default () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            title: 'This is title.',
            content: 'This is content.',
            author: 'bear.',
            url: 'https://github.com/littlebearbond',
        }), 2000);
    })
};

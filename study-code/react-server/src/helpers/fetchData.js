export default () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            title: 'This is title.',
            content: 'This is content.',
            author: '大板栗.',
            url: 'https://github.com/justclear',
        }), 2000);
    })
};

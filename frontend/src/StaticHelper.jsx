export default class StaticHelper {
    static getApi() {
        if (process.env.NODE_ENV === 'production') {
            // Production URL
            return 'https://beans-for-good.onrender.com/';
        } else {
            // Development URL
            return 'http://localhost:3000/';
        }
    }
}
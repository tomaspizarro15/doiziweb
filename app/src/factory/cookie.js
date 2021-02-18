import Cookie from 'universal-cookie'; 

const cookie = new Cookie(); 

export const get = (key) => cookie.get(key)
export const set = (key, obj) => {
    const date = new Date(); 
    let time = date.getTime();
    time += 3600 * 1000;
    date.setTime(time);
    return cookie.set(key , {...obj}, {maxAge : date})
}
export const remove = (key) => cookie.remove(key)

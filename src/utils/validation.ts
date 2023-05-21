import { isEmpty } from 'lodash';

export const emailRegex = /^(?=[A-Za-z0-9@._%+-]{6,254}$)[A-Za-z0-9._%+-]{1,64}@(?:[A-Za-z0-9-]{1,63}\.){1,8}[A-Za-z]{2,63}$/;

export const fieldIsUnique = (
    fieldName: string,
    field: string,
    item: any,
    arr: any[],
    msg = `${fieldName} is already used`,
    uniqueId: string = ''
) => {
    return () => {
        //TODO: refactor to check for string then do localCompare with accent sensitivity if it is
        return (
            -1 ===
                arr.findIndex((x) => {
                    if (!isEmpty(uniqueId) && x[uniqueId] === item[uniqueId])
                        return false;
                    return (
                        x[field] === item[field] || x[field] === parseInt(item[field])
                    );
                }) || msg
        );
    };
}
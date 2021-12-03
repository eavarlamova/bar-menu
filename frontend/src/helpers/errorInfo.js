export const getErrorInfo = (error) => {
    const {
        response: {
            data: { msg },
            status,
        }
    } = error;
    return { msg, status };
};
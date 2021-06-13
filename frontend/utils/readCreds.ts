import AsyncStorage from "@react-native-async-storage/async-storage";

interface ReadCreds {
    creds?: {
        uid: string;
        password: string;
    }
    error?: string
}

const readCreds = async (): Promise<ReadCreds> => {
    try {
        let uid = await AsyncStorage.getItem("uid")
        const password = await AsyncStorage.getItem("password");
        if(uid && password) {
            uid = uid.toUpperCase();
            return {creds: {uid, password}}
        }
    }
    catch(e) {
        console.warn(e);
    }
    return {error: "Error reading creds"}
}

export default readCreds;
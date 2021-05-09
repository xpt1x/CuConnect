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
        var uid = await AsyncStorage.getItem("uid")
        var password = await AsyncStorage.getItem("password");
        if(uid && password) {
            uid = uid.toUpperCase();
            return {creds: {uid, password}}
        }
    }
    catch(e) {
        console.log(e);
    }
    return {error: "Error reading creds"}
}

export default readCreds;
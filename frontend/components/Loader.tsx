import React from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { View } from "react-native"

export default function Loader(){
    return(
        <View style={styles.loader}>
          <ActivityIndicator animating={true} size={"large"} />
        </View>
    )
}

const styles = {
    loader: {
        flex: 1,
        marginTop: "70%"
    }
}
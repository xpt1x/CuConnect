import React from "react";
import { StyleSheet, Image } from "react-native";

import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const LeftContent = (props: { size: number }) => (
  <Avatar.Icon {...props} icon="folder" />
);
const RightContent = (props: { size: number }) => (
  <Button
    labelStyle={{ fontSize: 20 }}
    color={"#757676"}
    icon="exclamation"
    onPress={() => {}}
  >
    {" "}
  </Button>
);

// const height = (Image) => {
//     return Image.getSize(require('@expo/snack-static/react-native-logo.png'), ( width, height ) => { return height }, ( error ) => { return error })
// }

export default function SocialCard() {
  const [liked, setLiked] = React.useState(false);
  const toggleLike = () => setLiked(!liked);

  let lastTap: number | null = null;
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      toggleLike();
    } else {
      lastTap = now;
    }
  };
  return (
    <Card
      style={styles.card}
      onPress={() => {
        handleDoubleTap();
      }}
    >
      <Card.Title
        title="Title"
        subtitle="Card Subtitle"
        left={LeftContent}
        right={RightContent}
      />

      <Card.Cover
        style={{ height: 250 }}
        source={{
          uri:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgVFRUYGRgaGhgYGBgYGBgYGBoZGBgaGRgYGhgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHBISGjQhISE0NDQ0NjQ0NDQ0NDQxNDQxNDQ0NDQ0NDc6NDY0NDU/NTU0NDQ0NDY0NDQ0NDQxNDc0NP/AABEIARMAtwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EADcQAAIBAgQEBAQEBgIDAAAAAAECAAMRBBIhMQVBUWEicYGRBhOh8DJSscEUQmLR4fEjcjNzwv/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgQDBf/EACYRAQEAAgEEAgEEAwAAAAAAAAABAhEhAxIxQQRR4RMiYXGhsdH/2gAMAwEAAhEDEQA/APMYQhNIdTW5A7zpqSU6dNjlW55k3M5eO1tvESwVGuSd42KRaJCiPQ25xkBAVzeKXNrRsID1AtGmIIQHo9ogbnGxbQFLRsUCI0AhAQgEt8OpB3CsDY9JUmr8PoXfIBe+ug10iJU74Bw5VFNjsSL6SDE03pFS+p2nb8GAbElCh0Tr+xmN8T4Uq7KU11PodrSolwGLR1F9L8vKE5FarptcdokCtCEJGigxIGOUawEZr7xJPiaQUixvcSCAQhCAGEIQJUp3F41xH03tJHp3F4TasBJFp3GkFMcTY6GDaG0Qyfy1kNTc2hQDEhCATpPg3igw7sxQMCLHqPKc3Nv4YwqPUId8osfUwO04NxSm9dqgsp1FjtrJ+IlqlVWZAVBAuNdCec53hHDc9Vwh8INjrNzGYWpQQsGul9QN5T0m4z8M03YMoC3hLSD59MMSVBtbme8IXTx+EI8JIgRbm0k+UekYosZYLuBvCVBWFtzIpPieV5BBCgxcsXJpeKsKYwhaS1iJDBEgQ6GXMLSzG17SI0/ADG07k6aQydXpeMqusjKEGxlikhRsx9YpUO9hzgS0cN4c40Ycusza73YnadCwNNgpNwd+15iY9AHa228LFaEIQolnBPla97StLfD6WZwLe8JXTfCmKqfM8Fjc8+c6PifzQr52HIheXpOb+GAEqNvp0mj8RVnbxrmta1jKelpeIsgUhfwiw6G4hMyhxGnktUBHbveEJuuHEsUyNbiRUiMwvteaCVEZvw2095FqvSALiW8TTKxmDpqXN5ZxLgG28Ix6x1jUEsYxgSLCLgtz+8L6QqpMVDlOusno0ySSBeJXQWvCG4plIBG8qx7RghY3a2FdaQKrcW1/1MzC0y7WE28NiL0SrE7aTLwCMW8JsRKh+GoHOVKk77R3DwErAsNAQbHpeXMJxD5VQFhfSx9ZV41WvUzrpfW0g7Hj9KlVRXpgA2F7zzzGCzsO82aFd3WwBC9dbTHxiAOQIp7QQkuHtm1EjcamGiTX+HKIepY9JkS3w2o6vdDY218oSu7+EMCrVnOYFV5Hcnv2nRfE1Bf4d22y2I97TzzgtaoKhdCQ19bHe3WafxDxCq6jPnsbC2wPtBLww+JYhM2m/OEr4rDE+LKReEqMwCS0xYxijWT0lF5FpaRJO8lKFjuLyFEuTJEp99YRFiaZU2MiWSYm99TeJQGu14X0uYdtdTlB5wXC52yhpdTK2Ww0BF7ze4Xgkq1CwA0Frd5UcPiKWRivSRCa/wARYT5dU9Dc2mSu8izw0cNif5OREfgEsx17SDCuocZhpzlqhSz1SEhEeMp+MCQY6nZwBz5SxjQyPZhtFxDKzoQDfS8DewfBaqURVIIS2Yg228pynECC7Fdibz0inVrvRyJdxlGmW/pPN+JKRUYMtiDYiKsRYZLsBa8bWWzEd4/C2zi5t3ja4sx1vrvCo5d4VVCPdtpSkmHazQlbGGrlXYobXN50NXiBekiPa4YazlMPUF5earZd+4hHScRxCBcrKOWw3hOXxXFWawPKEbGMJIjWkYEt4Ole+l4WmUn1N5YRwd9JWVLk8pYwqAk5oRTrtdpJhLX1jMQoDG0mwKqSc0L6a+FZGRvzTd+AqaF2Z3sVuBc2vOe4cg8VvrLPDwMrFb5rnQXlRF8aVA1c2769Rec6p1l/ipOa7bmUE3EixoPhTlDc7STgmL+XUzH77ywK5y69JnfKJbTrIjR4o4qOT1kfCheugcaC8q1KLKbyTCVWDg8xA9Uw3EAq5KCAnv18p5V8RFjiHL6MTc+s67BVGYA5jftOP4+T8973vpvKu2eoiGPpC50jXGphSR1PeNirAsU9DJ6rk26SDDkE6y05FhDKuyQklZLaiEmxUWW8M7AG0qLLuGayGUMovob7xcO4ub7STBqCDeMqKA2m0CDF2zaRcMo1uZHX3hSA1vC+kqVSL2M3PhssAxtcE63mFSAvrNXheKygrewvCK3xA16kyl3mhxepmeZ6ws8NVGJAiKxDSLD1NZKHzMZEJWqEmRgHOOsMtm3iZvGDeBvYDEsninP8WxXzKrOfL2l2piiF3mM7XJMrR+HPiEa+5hT3iMYCRViR1PeEqRUkyppvHULSYgSbRA6NaJJ6jaaQjYz1lqmPATKqy6if8ZMNHYddNIysCNTJsKSAJNxJbi8m+U1xtju1zePpiRNJ6DWmi+DkEdTEah9oqtCGYk6yFN4/EbxlPeF9LCJrLOHADHNfbQjkevcb+8Yikx6IUezgjqOYvrt1sdpm0x+yuNZEV8YkpIkdxmEFWKii0yG3mywuJjvuZYoQ6xpiiIYBHU42OpmVKsU2lhatxrKl49G0hFhyBqISq1SEmhGsnNU5LSsJYZPADK00KH4RFxhGSNQ2URa4BUzKRjGWKKXBlcy1hz4TNFNEBARBCI6p1iUt4lTeOomxF9fvtIvpoUKxRg67qQRcXFwbi45yakpfPUcne99rseX+BsPKTKiGqVLBEz2LWIAQn8QFzpbbflNbFNhzh0ShSNy58TC5Nr3bNvfTbTfbaeGWerNTz7+nR0+nbLu8T191zVtZE+8sYpQt8rAixKnp215yooNh7+895dx4Wa4WxVAEzG3lpRvfpKkJCiJFWJKoioYkBAfaJeAiiA2EW0WQAllx4FlYS1VcZVErKYHQRlV9LQfYSCo8CvLKHSVpOF0haLwAioNIqLCK7nWLT3035RKm8WmNZF9Oh4XijVy0lCrUyZEfKNQFtkfQ3BGmx5TT4Nhnw7VUrqyl1yrYjKQ5sSrDToNO402mVwOpRVgXV89xkZToCdNRp13npiMzABgL+hGwIPrPnfJ6nZbjJxX0/i9Pvkzt5n+nkPEbq7rtrb66+neRK9jNX4ra2JZQoBQklhfXYqT7af8AaYtRZ29PLeEt9uHr4zHOyeqtPWBB8pnxxMbPSR5gQhCUEIRQIDqcRhHKLGOe28giBhHKIsMnMt9R6xbRim0lTUfd5Wisx2kTSRkkbKYZRywNt5Dliw0soQBEErZjHfMkDH3jqQ1jSJYwlMMwztlS4ztzC3FyBzPTvFuoSb4dL8GYAviUJVSqKXIbUlQSgKruSGt5WnpPElWmtvECDa7H+UKbnob3BvynHcN4W1LEJXSncIjinlLMGbI4QX2UW8bH0/mml8a8Wtg3W4LhkRdbEZtSy8zs4t3E+X1r+rnNe+H1MML0p/E8ubw2FXEYbiGMa12emtO9wQFcEkd2BQeYb045zO5+G2RqFbDEZbI+Zr+EuoDXHMsDnPlOGqLO3o3mz1NacnXw1q32YTEhCdDmEIQkBJcPvIoqtaBI55yO8cXJi+kBl4RSh6GLKFUXkinr6SFWtJGbWBOiXGg0kiUzt/qQLWtD555f3hlZIUG2X6AxflpY3A9NJU+drufoNfKIcQTfX785F0tCmhv4du9o4UE6D3MoK56+vOOznrCrppp+Ue5E3fhfAU3q+NFYfLZwrag2dVP7zlQTOv8Ag+q6pUZqhCDIopkmxLm+ZDewIG4trmE5/kZWYXTp+Lj3dSSu74vjclMBRqRdQLjKxUBvw9v0HecLxPFUWel+N/lJ85/F4FKBmyFdmu9vED/NOmw2K/iAWp+Fc+QH+XKBdmsdhdSo8jMr4OCVsRijqA+bIyDwhUYZSNxr4fPMeV5wdLjds8PpdSYzGYz35ScI4Q6UQ1TVmQlgwtZXouGIPUmoo6adpweDa4tudBbb75z1L4qxASnUZbKrUiVXcAqqgi3S4t7EbTyWmlgpBIJzEadOV/fTy6zr+Llb3W/bj+Vj3TH+mkV/p+sVUW2495nfxRMamIIJI5zscC9UYAiwDAm2lrxSg2sB0NhKIxRBvJP43tAtKgPISGsPEL8te/8AqQ/xh6RlXEltIF4rz5RCx6SkmKIAHSO/ie0Cdj/jaEgOIEIZVYQhDRY8GRxyyh1o0xSI0QHWjkWKBHSNSEC3nY/DDtTDUnDJ8xbhiuill8DWPM2PtOTw6+IHpr7bTtad1KIoDVfnF3UC6nKPAAR+FRYAXO2bTacnybudru+Hjz3OhoZKFNsiscyqiKpBOYkJTuptpmb1uZU+FOBNTzKCCyNktsTnAZ2AO+mRR/6zKXxdxIIaVKm3jAWrVZDYggWpJfqGdjbuh6TpsHh3GKw4bMXKvVrKSAozADMCB4mAYi1yek45hlMdX26cs8buzz/xk/HOHyYTMRZgGS1wwuzBmY/l0JFup7CcKMJ4KX/QMBzBYuzG3Qg8/wAoHOd58b8QRsE+VgxZ0XfqSxYg63sgv92yeJYzDqMKuVgFoUUJKrZ0qIEJGuwKtqL+JbEcx7dLcwmvt5b/AH/u9T8vO6iFSQeUbL/F6WWq68wx8tddO2v1lCd+N3JXzs5rKz6ohCE0wIQhAIQhKCEIQCEIQCEIQFJgBEigwLFJQfSdV8rCV8MclNqeIpIubKwK1VFlzFdlYnXS1zve+nIITyt7iXqBdlZQGFwb2BsQPEAbf1AAd7Tzzm5uXT16dkurNtbgOBRjULMQ1NPmC38zB1UL2Hj/AG5yzhKrBqtR2y3CqltbMU+YzkaEgAKCf61Ep8BqBFxLsR/4gg31Z6tPKR28N+0j4riFARASGfLn0vlQWAAHM6E27d5z5Y3LLX27elnMenucaaHBga1cVah8Oda9Vt8tNHyhe+xFuyzq6XGqq0a2MZWNTENaipNgFANFCF/N+Lz3nNcMrBRamSr1XXKungpiyoGPO6hb+/MzpuP4tQcPh1AK4ei+Ifa16dM/JXoTntp0M8rd5dvj8NWSYS+bXFYuoGwSgm7nEMxH9FKkBp5tW9bGTYgtUw1MhDbDt8sve9lqI1Vhr3Vj2sBzlfi2CKYbDuUNjUdr2FgHAKA8wSE8iB2E6xabDhyWF6VQuQbWZHGZctwdQ2UAG11JtsRPS2SSz7rGO7le683Tz7F0zmvfna4tqBcA6eQ95VK5tlIP0PsND9JoYqwAAJte4J1urhWTl0A9bzOddSfqJ0Ycxy9WSZIYSbN1sfP709JGU6ffaejxNhHFDEywhIRwSBQwGwi2iQFtFAvzjwn3+8dkPK58oEYTvr0gycr6+lve8c6kfiBHYi0Rct+du28BhFt4klLW6escCpP4de2t4EarNXgqU/mp8weAMpeyk5lBBYWB6c+UpIo0va3ta/QG15KKTWsFJ1Fjbwm5t+8zlzNN48XcaFemabuFqG1N2CBwHuVdgLbWvYn1Ey6epLvtr/m36Dzkz03y5eYNj5HUHv8A6kL0nJyhTYEC3TS4v03mcZ53XtnlvUk4jq/hqtTSo2IrGwWmzkAAf8h8Coi21soXfnfzNrE02/g6mJYj5lRgHUKBkBKfLTf8ORidt2I5Tl3xgYZX1XNmY2uzMBa173AOm3+panFM1I0xcKWDG6nloPETsCec8b07bv8An/D1nVxmN551w3+LCl8l0JKslHDoiknMzumZmCk7eAG9tA2ku/BNdxh2fQpTcBkNjmLKVvlPPxDXlbnfTh8ZjGdy1rMQBcks2i5b5r9BI6DsgzAlGvpy08+XOX9G3HW+fKX5EmU43JNf23eNFKNR6Tor5C9JBcaU84qUHDdQruhPTL0MwmN7MRlHJdMouTt19YjV7m+7aWbfY3vbY841aYYgu4toNDrbWwtbTbnPXHHTx6mcy4h4oG+qtbrsPPXcSN2A2t7axzsNPCwRb2OupNtddP0jnq59Llrcm30/btNarz3jEOcE67/doqKT+55DztHIgBNhfQ21t2I77xHJGx31tylZK2oCqNr3Pf8AtI2pkb/TX9JIjNvb21HnprAFr/4P7iDhCygdYSQ27ew/eJKhue22/Ucoi3Pl97iRx94ExcWsGNujX1PkNJCPv76RCfSAHLWBYRxpddvr77ekiCjfUd9/KIBb94FoD0xLjvbkRcD+0kpYoA3y2O+l7eoOn0kAj1rECwt7D94FhMeNMy5h3/F7843F1Q3iW5+tvPn6mMp1GIy2QjncKPrpICDm00N+Rk1PK911pMiNa4S4PS528jLC0gGub9ibqCLDla995UBv2PUfuB+sYWP5v1/tGklTlsxsnXYkkkW119JNndVtdRvzAYr+UAjz5SnTe3Me1/1ElrVb87+QIH6xpdlGUgnXN2tbU36SNSCRfQDoPTqI+kea5b/lOntfeMqs1/ED6/4lRI+IJBCgBbbdOu0YH01A9N+1+Uhv2jkcDcX9T+0CdvzZdPXU8vOBpg65/e1vLeV2a/2Y28CZ/O/fX76RA5Gx33HKREwgOhGQgS01vvcD81tIjqASL38oGqxULfQbDpEItygIscHPUxhgDAcBFsfvWNzRbwHB+nkdPu3KIT5RDEJgPZ83IQyi91/yI1vpAQHfekb6RDHH69YDLRbRcutrxWtylCZvKKlZl0B06HUexjCIoWBKxBGot5H/AOTIyByP0MQXg0BVUHmB53/aBQfmHsf7RohAcQvUnrpaKxHIH1P+IyKSdBygIDCKYsBsM5ta8IQEjqcWEFNaJCEJCxwhCFNhCEAMQwhABHQhCUgjoQhSGEIQEiwhIEMWEJQ2EIQP/9k=",
        }}
      />
      <Card.Actions>
        <Button
          labelStyle={{ fontSize: 29 }}
          color={liked ? "#f27d0c" : "#757676"}
          style={styles.button}
          icon="fire"
          onPress={() => {
            toggleLike();
          }}
        >
          {" "}
        </Button>
        <Button
          labelStyle={{ fontSize: 20 }}
          color={"#757676"}
          style={styles.button}
          icon="comment"
          onPress={() => {}}
        >
          {" "}
        </Button>
      </Card.Actions>
    </Card>
  );
}
const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
  },
  button: {
    width: 50,
  },
});

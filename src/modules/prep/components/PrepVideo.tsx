// import tw from '../../../common/tailwind';
// import CircularHeader from '../../../modules/prep/components/CircularHeader';
// import React, { useEffect, useState } from 'react';
// import { Dimensions, Image, Pressable, Text, View } from 'react-native';
// import YoutubePlayer, {
//   YoutubeMeta,
//   getYoutubeMeta,
// } from 'react-native-youtube-iframe';
// import { bodyMediumRegular } from '../../../theme/typography';

// const windowWidth = Dimensions.get('window').width;
// const itemWidth = windowWidth - 40;

// export default function PrepVideo({ id }: { id: string }) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [videoMeta, setVideoMeta] = useState<YoutubeMeta>();

//   useEffect(() => {
//     getYoutubeMeta(id).then(meta => {
//       setVideoMeta(meta);
//     });
//   }, [id]);

//   if (!id || !videoMeta) {
//     return null;
//   }

//   return (
//     <View style={tw.style('px-5 pb-6 pt-10')}>
//       <CircularHeader title="watch it" />

//       <View style={tw`mt-4 w-full overflow-hidden rounded-lg`}>
//         <YoutubePlayer
//           width={itemWidth}
//           height={(itemWidth * videoMeta.height) / videoMeta.width}
//           play={isPlaying}
//           videoId={id}
//           // videoId="Xqq5skmzf8g"
//           initialPlayerParams={{
//             loop: true,
//             controls: false,
//           }}
//           onChangeState={(event: string) => {
//             if (event === 'ended') {
//               setIsPlaying(false);
//             }
//           }}
//         />

//         {!isPlaying && (
//           <Pressable
//             style={tw`absolute left-0 top-0 z-10 h-full w-full`}
//             onPress={() => setIsPlaying(true)}
//           >
//             <Image
//               style={tw`absolute left-0 top-0 z-10 h-full w-full`}
//               resizeMode="cover"
//               source={{
//                 uri: videoMeta.thumbnail_url,
//               }}
//               accessibilityIgnoresInvertColors
//             />
//             <Image
//               style={[
//                 tw`${
//                   isPlaying ? 'z-10' : 'z-999'
//                 } absolute left-1/2 top-1/2 -ml-[27px] -mt-[27px] h-[54px] w-[53px]`,
//               ]}
//               resizeMode="contain"
//               source={require('../../../../assets/buttons/play-purple.png')}
//               accessibilityIgnoresInvertColors
//             />
//           </Pressable>
//         )}
//       </View>

//       <Text style={tw.style('pt-4', bodyMediumRegular)}>{videoMeta.title}</Text>
//     </View>
//   );
// }









import React, { RefObject } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import CircularHeader from "./CircularHeader";
import { Recipe } from "../types";


interface PrepVideoProps {
  recipe: Recipe;
  videoId: string | null;
  playing: boolean;
  togglePlayback: () => void;
  playerRef: RefObject<any>;
}

export default function PrepVideo({
  recipe,
  videoId,
  playing,
  togglePlayback,
  playerRef,
}: PrepVideoProps) {
  if (!videoId) return null;

  return (
    <>
      <CircularHeader title="WATCH IT" />
      <TouchableOpacity onPress={togglePlayback}>
        <View style={{ height: 200, marginBottom: 10, marginTop: 20 }}>
          <YoutubePlayer
            ref={playerRef}
            height={200}
            play={playing}
            videoId={videoId}
            webViewStyle={{ borderRadius: 12 }}
          />
        </View>
      </TouchableOpacity>
      <Text
        style={{
          textAlign: "left",
          fontSize: 16,
          color: "#444",
          marginBottom: 30,
        }}
      >
        Saveful Kitchen '{recipe.name}' Flexible Recipe
      </Text>
    </>
  );
}
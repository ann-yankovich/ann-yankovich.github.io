define(function (require, exports) {
    'use strict';

    var emotions = [
        {
            title: "Aeronautics&nbsp;&mdash; Capaddocia, Turkey",
            happiness: 67,
            curiosity: 40,
            boredom: 52,
            description: "Sky is&nbsp;the fifth ocean of&nbsp;the world. A&nbsp;true traveler should conquer it&nbsp;at&nbsp;least once in&nbsp;his life.<br> Also, think of&nbsp;the breathtaking view! So&nbsp;don&rsquo;t postpone this experience and try a&nbsp;hot-air balloon ride!",
            photo: "aeronautic",
            location: "Turkey"
        },
        {
            title: "Whale Watching&nbsp;&mdash; New Zealand",
            happiness: 64,
            curiosity: 82,
            boredom: 43,
            description: "Grab your camera and snap a&nbsp;photo of&nbsp;the biggest mammals on&nbsp;the Earth. Board a&nbsp;boat and feel the salt droplets on&nbsp;your face.",
            photo: "whale-watching",
            location: "New Zealand"
        },
        {
            title: "Surfing in&nbsp;Portugal",
            happiness: 77,
            curiosity: 38,
            boredom: 53,
            description: "Riding a&nbsp;wave removes our brains out of&nbsp;the ordinary and slips&nbsp;us into the extra ordinary of&nbsp;being there now. No&nbsp;more worries about mortgages or&nbsp;strife of&nbsp;being poor or&nbsp;rich. Conquer the wave!",
            photo: "surfing",
            location: "Portugal"
        },
        {
            title: "Pat a&nbsp;Komodo Dragon in&nbsp;Indonesia",
            happiness: 45,
            curiosity: 71,
            boredom: 67,
            description: "Or&nbsp;don&rsquo;t. These 3000 year old lizards are quite venomous. But they are a&nbsp;real marvel to&nbsp;look&nbsp;at.<br>You can even feed the &laquo;dragon&raquo; with raw fish!",
            photo: "comodo",
            location: "Indonesia"
        },
        {
            title: " Eat fried insects in&nbsp;Thailand",
            happiness: 45,
            curiosity: 71,
            boredom: 67,
            description: "Time to&nbsp;broaden your taste palate! Drop by&nbsp;the night market Rot Fai and munch on&nbsp;bamboo worms, crickets and ominous-looking scorpions. Yummy!",
            photo: "insects",
            location: "Thailand"
        },
        {
            title: "Meet the quokkas in&nbsp;Australia",
            happiness: 61,
            curiosity: 45,
            boredom: 71,
            description: "Take a&nbsp;selfie with the friendliest marsupial in&nbsp;the world. But watch out for your snacks. They love stealing food from tourists!",
            photo: "quokkas",
            location: "Australia"
        },
        {
            title: "Bungee Jumping in&nbsp;South Africa",
            happiness: 69,
            curiosity: 31,
            boredom: 72,
            description: "Ready to&nbsp;feel some wind in&nbsp;your face and test your courage?<br>Or&nbsp;maybe you are afraid of&nbsp;heights and need to&nbsp;conquer that fear. Well, then bungee-jumping is&nbsp;for you!",
            photo: "bungee-jumping",
            location: "South Africa"
        },
        {
            title: "Treasure hunting in&nbsp;Egypt",
            happiness: 57,
            curiosity: 73,
            boredom: 61,
            description: "Have you ever wanted to&nbsp;feel like a&nbsp;true explorer? Try the ocean. The underwater world hides more mysteries than land. Who knows, maybe you will find your own Atlantis!",
            photo: "diving",
            location: "Egypt"
        },
    ];

    exports.getRandomEmotion = function() {
        var keys = Object.keys(emotions);
        return emotions[Math.floor(Math.random() * keys.length)];
    }
});
/* AIRLINE SAGA — 항공커리어노트 교육용 공항 업무 게임 (체크인편 Day 1–5, 음성 분할판). 소스: 게임개발\AIRLINE_SAGA_GAME\src */
window.ASSETS = {"checkin_bg_01": {"src": "saga/img/checkin_bg_01.webp", "w": 1600, "h": 900, "px": 0.5, "py": 0.5, "flip": true, "cat": "backgrounds"}, "checkin_bg_02": {"src": "saga/img/checkin_bg_02.webp", "w": 1600, "h": 900, "px": 0.5, "py": 0.5, "flip": true, "cat": "backgrounds"}, "koradon_greet_01": {"src": "saga/img/koradon_greet_01.webp", "w": 290, "h": 520, "px": 0.5283, "py": 0.995, "flip": false, "cat": "mascots"}, "koradon_idle_01": {"src": "saga/img/koradon_idle_01.webp", "w": 260, "h": 520, "px": 0.5, "py": 0.995, "flip": false, "cat": "mascots"}, "korarin_greet_01": {"src": "saga/img/korarin_greet_01.webp", "w": 297, "h": 520, "px": 0.5513, "py": 0.9948, "flip": false, "cat": "mascots"}, "korarin_idle_01": {"src": "saga/img/korarin_idle_01.webp", "w": 257, "h": 520, "px": 0.4965, "py": 0.9948, "flip": false, "cat": "mascots"}, "passenger_female_01": {"src": "saga/img/passenger_female_01.webp", "w": 432, "h": 900, "px": 0.5188, "py": 0.996, "flip": true, "cat": "passengers"}, "passenger_female_02": {"src": "saga/img/passenger_female_02.webp", "w": 409, "h": 900, "px": 0.5897, "py": 0.996, "flip": true, "cat": "passengers"}, "passenger_female_03": {"src": "saga/img/passenger_female_03.webp", "w": 382, "h": 900, "px": 0.5057, "py": 0.9959, "flip": true, "cat": "passengers"}, "passenger_male_01": {"src": "saga/img/passenger_male_01.webp", "w": 379, "h": 900, "px": 0.5159, "py": 0.996, "flip": true, "cat": "passengers"}, "passenger_male_02": {"src": "saga/img/passenger_male_02.webp", "w": 353, "h": 900, "px": 0.5334, "py": 0.996, "flip": true, "cat": "passengers"}, "passenger_male_03": {"src": "saga/img/passenger_male_03.webp", "w": 355, "h": 900, "px": 0.5474, "py": 0.996, "flip": true, "cat": "passengers"}, "prop_boarding_pass_01": {"src": "saga/img/prop_boarding_pass_01.webp", "w": 520, "h": 242, "px": 0.5, "py": 0.9914, "flip": true, "cat": "props"}, "prop_counter_01": {"src": "saga/img/prop_counter_01.webp", "w": 520, "h": 210, "px": 0.4869, "py": 0.9898, "flip": true, "cat": "props"}, "prop_luggage_01": {"src": "saga/img/prop_luggage_01.webp", "w": 331, "h": 520, "px": 0.429, "py": 0.9947, "flip": true, "cat": "props"}, "prop_monitor_01": {"src": "saga/img/prop_monitor_01.webp", "w": 520, "h": 491, "px": 0.4915, "py": 0.9936, "flip": true, "cat": "props"}, "prop_passport_01": {"src": "saga/img/prop_passport_01.webp", "w": 488, "h": 520, "px": 0.5, "py": 0.9944, "flip": true, "cat": "props"}, "prop_scale_01": {"src": "saga/img/prop_scale_01.webp", "w": 520, "h": 458, "px": 0.5703, "py": 0.9938, "flip": true, "cat": "props"}, "prop_travel_documents_01": {"src": "saga/img/prop_travel_documents_01.webp", "w": 520, "h": 362, "px": 0.5, "py": 0.9936, "flip": true, "cat": "props"}, "staff_checkin_check_01": {"src": "saga/img/staff_checkin_check_01.webp", "w": 414, "h": 900, "px": 0.5678, "py": 0.9959, "flip": true, "cat": "staff"}, "staff_checkin_explain_01": {"src": "saga/img/staff_checkin_explain_01.webp", "w": 506, "h": 900, "px": 0.4916, "py": 0.996, "flip": true, "cat": "staff"}, "staff_checkin_greet_01": {"src": "saga/img/staff_checkin_greet_01.webp", "w": 421, "h": 900, "px": 0.5799, "py": 0.996, "flip": true, "cat": "staff"}, "staff_checkin_idle_01": {"src": "saga/img/staff_checkin_idle_01.webp", "w": 421, "h": 900, "px": 0.6026, "py": 0.996, "flip": true, "cat": "staff"}, "passport_female_01_front_01": {"src": "saga/img/passport_female_01_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits", "for": "passenger_female_01"}, "passport_female_02_front_01": {"src": "saga/img/passport_female_02_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits", "for": "passenger_female_02"}, "passport_female_03_front_01": {"src": "saga/img/passport_female_03_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits", "for": "passenger_female_03"}, "passport_male_01_front_01": {"src": "saga/img/passport_male_01_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits", "for": "passenger_male_01"}, "passport_male_02_front_01": {"src": "saga/img/passport_male_02_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits", "for": "passenger_male_02"}, "passport_male_03_front_01": {"src": "saga/img/passport_male_03_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits", "for": "passenger_male_03"}, "passenger_female_01_worried_01": {"src": "saga/img/passenger_female_01_worried_01.webp", "w": 432, "h": 900, "px": 0.5188, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_female_01"}, "passenger_female_01_upset_01": {"src": "saga/img/passenger_female_01_upset_01.webp", "w": 432, "h": 900, "px": 0.5188, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_female_01"}, "passenger_female_01_happy_01": {"src": "saga/img/passenger_female_01_happy_01.webp", "w": 432, "h": 900, "px": 0.5188, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_female_01"}, "passenger_female_02_worried_01": {"src": "saga/img/passenger_female_02_worried_01.webp", "w": 409, "h": 900, "px": 0.5897, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_female_02"}, "passenger_female_02_upset_01": {"src": "saga/img/passenger_female_02_upset_01.webp", "w": 409, "h": 900, "px": 0.5897, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_female_02"}, "passenger_female_02_happy_01": {"src": "saga/img/passenger_female_02_happy_01.webp", "w": 409, "h": 900, "px": 0.5897, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_female_02"}, "passenger_female_03_worried_01": {"src": "saga/img/passenger_female_03_worried_01.webp", "w": 382, "h": 900, "px": 0.5057, "py": 0.9959, "flip": true, "cat": "passengers", "sameAs": "passenger_female_03"}, "passenger_female_03_upset_01": {"src": "saga/img/passenger_female_03_upset_01.webp", "w": 382, "h": 900, "px": 0.5057, "py": 0.9959, "flip": true, "cat": "passengers", "sameAs": "passenger_female_03"}, "passenger_female_03_happy_01": {"src": "saga/img/passenger_female_03_happy_01.webp", "w": 382, "h": 900, "px": 0.5057, "py": 0.9959, "flip": true, "cat": "passengers", "sameAs": "passenger_female_03"}, "passenger_male_01_worried_01": {"src": "saga/img/passenger_male_01_worried_01.webp", "w": 379, "h": 900, "px": 0.5159, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_male_01"}, "passenger_male_01_upset_01": {"src": "saga/img/passenger_male_01_upset_01.webp", "w": 379, "h": 900, "px": 0.5159, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_male_01"}, "passenger_male_01_happy_01": {"src": "saga/img/passenger_male_01_happy_01.webp", "w": 379, "h": 900, "px": 0.5159, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_male_01"}, "passenger_male_02_worried_01": {"src": "saga/img/passenger_male_02_worried_01.webp", "w": 353, "h": 900, "px": 0.5334, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_male_02"}, "passenger_male_02_upset_01": {"src": "saga/img/passenger_male_02_upset_01.webp", "w": 353, "h": 900, "px": 0.5334, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_male_02"}, "passenger_male_02_happy_01": {"src": "saga/img/passenger_male_02_happy_01.webp", "w": 353, "h": 900, "px": 0.5334, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_male_02"}, "passenger_male_03_worried_01": {"src": "saga/img/passenger_male_03_worried_01.webp", "w": 355, "h": 900, "px": 0.5474, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_male_03"}, "passenger_male_03_upset_01": {"src": "saga/img/passenger_male_03_upset_01.webp", "w": 355, "h": 900, "px": 0.5474, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_male_03"}, "passenger_male_03_happy_01": {"src": "saga/img/passenger_male_03_happy_01.webp", "w": 355, "h": 900, "px": 0.5474, "py": 0.996, "flip": true, "cat": "passengers", "sameAs": "passenger_male_03"}, "passenger_male_04": {"src": "saga/img/passenger_male_04.webp", "w": 378, "h": 900, "px": 0.5339, "py": 0.996, "flip": true, "cat": "passengers"}, "passenger_female_04": {"src": "saga/img/passenger_female_04.webp", "w": 383, "h": 900, "px": 0.5447, "py": 0.996, "flip": true, "cat": "passengers"}, "passenger_male_05": {"src": "saga/img/passenger_male_05.webp", "w": 360, "h": 900, "px": 0.5344, "py": 0.996, "flip": true, "cat": "passengers"}, "passenger_male_10": {"src": "saga/img/passenger_male_10.webp", "w": 367, "h": 900, "px": 0.5444, "py": 0.996, "flip": true, "cat": "passengers"}, "passport_male_04_front_01": {"src": "saga/img/passport_male_04_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "passport_female_04_front_01": {"src": "saga/img/passport_female_04_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "passport_male_05_front_01": {"src": "saga/img/passport_male_05_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "passport_male_10_front_01": {"src": "saga/img/passport_male_10_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "passport_male_02_old_front_01": {"src": "saga/img/passport_male_02_old_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "passport_male_10_brother_front_01": {"src": "saga/img/passport_male_10_brother_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "prop_golfbag_01": {"src": "saga/img/prop_golfbag_01.webp", "w": 208, "h": 520, "px": 0.4765, "py": 0.996, "flip": false, "cat": "props"}, "prop_cabin_bag_01": {"src": "saga/img/prop_cabin_bag_01.webp", "w": 322, "h": 520, "px": 0.689, "py": 0.9958, "flip": false, "cat": "props"}, "prop_luggage_02": {"src": "saga/img/prop_luggage_02.webp", "w": 316, "h": 520, "px": 0.4346, "py": 0.9958, "flip": false, "cat": "props"}, "prop_luggage_03": {"src": "saga/img/prop_luggage_03.webp", "w": 312, "h": 520, "px": 0.4058, "py": 0.9959, "flip": false, "cat": "props"}, "prop_duffel_01": {"src": "saga/img/prop_duffel_01.webp", "w": 520, "h": 474, "px": 0.5767, "py": 0.9947, "flip": false, "cat": "props"}, "prop_bagtag_01": {"src": "saga/img/prop_bagtag_01.webp", "w": 279, "h": 520, "px": 0.5, "py": 0.9958, "flip": false, "cat": "props"}, "prop_tag_fragile_01": {"src": "saga/img/prop_tag_fragile_01.webp", "w": 356, "h": 520, "px": 0.5, "py": 0.9949, "flip": false, "cat": "props"}, "passenger_male_06_cane": {"src": "saga/img/passenger_male_06_cane.webp", "w": 420, "h": 900, "px": 0.5165, "py": 0.996, "flip": true, "cat": "passengers", "hr": 1.0}, "passenger_male_06_wheelchair": {"src": "saga/img/passenger_male_06_wheelchair.webp", "w": 480, "h": 702, "px": 0.4848, "py": 0.9959, "flip": true, "cat": "passengers", "sameAs": "passenger_male_06_cane", "hr": 0.78}, "passenger_child_01": {"src": "saga/img/passenger_child_01.webp", "w": 260, "h": 630, "px": 0.5465, "py": 0.996, "flip": true, "cat": "passengers", "hr": 0.7}, "passenger_female_07": {"src": "saga/img/passenger_female_07.webp", "w": 325, "h": 900, "px": 0.5582, "py": 0.996, "flip": true, "cat": "passengers", "hr": 1.0}, "passenger_female_05": {"src": "saga/img/passenger_female_05.webp", "w": 380, "h": 900, "px": 0.5685, "py": 0.996, "flip": true, "cat": "passengers", "hr": 1.0}, "passenger_female_06": {"src": "saga/img/passenger_female_06.webp", "w": 346, "h": 900, "px": 0.5119, "py": 0.9961, "flip": true, "cat": "passengers", "hr": 1.0}, "passenger_male_07": {"src": "saga/img/passenger_male_07.webp", "w": 388, "h": 900, "px": 0.5556, "py": 0.9961, "flip": true, "cat": "passengers", "hr": 1.0}, "passenger_female_08": {"src": "saga/img/passenger_female_08.webp", "w": 337, "h": 900, "px": 0.5177, "py": 0.996, "flip": true, "cat": "passengers", "hr": 1.0}, "passenger_child_02": {"src": "saga/img/passenger_child_02.webp", "w": 270, "h": 540, "px": 0.5656, "py": 0.996, "flip": true, "cat": "passengers", "hr": 0.6}, "passenger_male_08": {"src": "saga/img/passenger_male_08.webp", "w": 377, "h": 900, "px": 0.5, "py": 0.996, "flip": true, "cat": "passengers", "hr": 1.0}, "passenger_female_03_infant_01": {"src": "saga/img/passenger_female_03_infant_01.webp", "w": 414, "h": 900, "px": 0.5596, "py": 0.9959, "flip": true, "cat": "passengers", "sameAs": "passenger_female_03", "hr": 1.0}, "passport_male_06_front_01": {"src": "saga/img/passport_male_06_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "passport_child_01_front_01": {"src": "saga/img/passport_child_01_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "passport_female_07_front_01": {"src": "saga/img/passport_female_07_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "passport_female_05_front_01": {"src": "saga/img/passport_female_05_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "passport_female_06_front_01": {"src": "saga/img/passport_female_06_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "passport_male_07_front_01": {"src": "saga/img/passport_male_07_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "passport_female_08_front_01": {"src": "saga/img/passport_female_08_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "passport_child_02_front_01": {"src": "saga/img/passport_child_02_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "passport_male_08_front_01": {"src": "saga/img/passport_male_08_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "passport_infant_01_front_01": {"src": "saga/img/passport_infant_01_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits"}, "prop_pet_carrier_01": {"src": "saga/img/prop_pet_carrier_01.webp", "w": 502, "h": 520, "px": 0.4774, "py": 0.9947, "flip": true, "cat": "props"}, "prop_wheelchair_01": {"src": "saga/img/prop_wheelchair_01.webp", "w": 520, "h": 516, "px": 0.6408, "py": 0.9948, "flip": true, "cat": "props"}, "prop_um_pouch_01": {"src": "saga/img/prop_um_pouch_01.webp", "w": 324, "h": 520, "px": 0.4993, "py": 0.995, "flip": true, "cat": "props"}, "prop_stroller_folded_01": {"src": "saga/img/prop_stroller_folded_01.webp", "w": 323, "h": 520, "px": 0.528, "py": 0.9949, "flip": true, "cat": "props"}};
window.VOICE_INDEX = {"v":"234665bb93e7","base":"saga/voices/","keys":{"00200d58":8589,"002147ed":14733,"00de3751":19389,"016e1f97":11661,"01ff8447":27693,"02f7b8a1":12189,"034cf60b":7245,"035bb78d":13005,"04170656":22701,"0491bb89":25965,"04a77e7d":11085,"0513f548":25197,"05382ef2":8877,"0559b8c0":12621,"055b9e6d":11853,"057991a1":22989,"05ce5004":16269,"05d34cf4":16461,"0654cd46":9453,"0703bfcd":22029,"07801492":13773,"0804812d":12813,"08911573":24429,"09213cdf":14445,"0994782f":22413,"09fd5a73":14925,"0a1b12eb":3789,"0a9d4551":13101,"0b0fc6ff":23181,"0b15794c":18093,"0b6efc32":7437,"0c170631":24621,"0c450161":7149,"0cf4be93":8589,"0d12de17":11181,"0d16c99f":6573,"0da22ce4":19437,"0f321d57":11949,"0fbfe971":15885,"0fceaabf":29037,"103a57ce":48045,"106816e8":25197,"10e5aae7":26061,"114530e3":18189,"1198aa65":22413,"11ba28b6":25773,"11c80c30":12189,"1200c53f":35517,"121e1f18":15021,"127cb78c":20493,"1288ed8b":20973,"12efb750":24909,"12fbe339":24621,"1321706f":14061,"135bb035":6957,"13e304f8":23853,"13ed1490":11373,"149d87cc":3021,"14a7df95":19437,"14ee5ecf":11565,"1550e722":20589,"15ad3d3e":15789,"15e8a91c":24525,"1686cbb7":39213,"16e27de9":23373,"17a68350":20397,"17e64651":15501,"17eafec7":12909,"1966b2f7":23085,"1968c6aa":21837,"19a355fd":23133,"19c2d7db":17997,"19d79678":48237,"1b31c3e9":5805,"1b9f24ca":21933,"1ba1b2e5":24813,"1bb5da86":13005,"1bc2ef63":22701,"1c836edc":14253,"1c9a5ae7":13005,"1cb1b2a0":13485,"1ce535a0":15981,"1d5a460f":7725,"1ddee44a":10893,"1e02a91e":17661,"1ec7ed77":10893,"1eceacdd":14445,"2052612d":18189,"2089c24b":21069,"209cdf6e":14349,"2135f036":12429,"22babe7c":22125,"22fd1b14":22029,"233bb451":9933,"236ac4a9":24621,"23716cce":6189,"241220dd":30189,"2432b1c8":12141,"243d4370":7917,"245673f4":21357,"24692d24":16269,"246c5142":7533,"249c95d8":14253,"252087aa":14349,"255bcf19":6957,"25747aa1":17229,"258b6b74":14445,"2638d377":13869,"267db8df":12045,"26e17dc7":12333,"26f6a8d9":22797,"277a2505":10509,"277be539":16941,"288d6c90":18669,"28a27f70":6285,"29283f39":25869,"2a3e993e":7821,"2a6cd88e":24045,"2adec78e":20685,"2af5ed58":4845,"2b6254fe":14925,"2bc9a2cd":23565,"2c501b62":13965,"2cb0c228":13101,"2cc2a6c8":10893,"2ce3e287":23949,"2ec5ed23":12621,"2ef30941":20109,"2f57c405":8301,"2f8e96d1":11661,"30062188":25101,"308a9eca":39501,"315bc936":12909,"31b55c4f":10893,"32832759":20205,"32f07235":26301,"32f527cd":17805,"32fa0694":20685,"334df891":13101,"336f3476":12237,"347b7fc6":8877,"34b319f3":20397,"352b5a69":17229,"35746fe5":21837,"357e1fd2":8877,"36b763ff":39837,"36cefbb6":8301,"36d55b9c":22893,"36f1d3d9":25677,"379c7461":10893,"38623a3d":4077,"3875fba6":22317,"397d9720":22893,"398d7dcf":6477,"39a347c0":7533,"39d97e88":10605,"3a16eb66":22797,"3ad8ef7d":7245,"3b5b98a5":20685,"3c20ea46":16077,"3cf3a519":18669,"3dc68700":14541,"3e410ba7":24621,"3ea7fba9":13293,"3ebf60d7":20781,"3ee2e23e":24813,"3f53f59b":15309,"3fab192f":13581,"401848f6":9837,"405c08a3":25005,"40d1fc1a":21933,"4127a234":16461,"41581a26":32493,"41c3c78a":13773,"41dc235c":6957,"41f855d3":5421,"421ea77a":11901,"422a937b":12525,"4243be08":7821,"42442274":6381,"42493d11":15981,"428c73ac":14733,"429ee352":14637,"42ff6b45":15597,"430ac058":11469,"4383e84b":24813,"44e44c7c":13293,"44fc069b":23565,"45286d92":6189,"4578c519":21645,"46ff1c99":14253,"470726a7":3693,"47e50370":21165,"4a0d5067":13389,"4a872e2b":22125,"4b3cc3dc":12621,"4b51c4df":25149,"4b552bf5":11277,"4bab9e1d":24141,"4c51b092":15021,"4c602488":18525,"4c6299b5":33501,"4c66480a":14253,"4c752970":14493,"4c9b130f":10989,"4c9db2ab":23085,"4cfadaa8":20397,"4ddc25ef":26061,"4e3b157c":6573,"4ef36ede":5997,"4f4ed927":20301,"4f8649a3":8109,"4fa85b40":19437,"50f41f20":23085,"51414928":24141,"518cf3fe":11757,"53b48f3e":38541,"5458a2d8":5805,"54714d58":23661,"55093f98":13677,"559a719c":6381,"55ff9e0a":8397,"560db1b0":13197,"561777e6":21645,"562d4707":26445,"56aeecf7":14925,"56c28fec":22893,"57329fe2":6765,"57bfa9e8":12429,"58671f2f":12333,"58f2107a":4557,"595382e5":24429,"5973664a":22029,"59a3810e":18093,"59b97923":12813,"59f05d59":14349,"5a1f56cb":33549,"5abd3fc5":24333,"5b1f8276":16461,"5bc30b0c":6189,"5c10b6a5":15405,"5c188a15":10893,"5c87ea42":21261,"5ccb1380":13869,"5d2fa7d2":22893,"5d3e5e2d":21165,"5db4d0ba":21165,"5dc97258":22413,"5ddffd76":22029,"5e72601e":20973,"5eafcf1e":25389,"5f770fb2":25005,"5f788f21":22605,"60a691d4":24333,"60dfc890":22509,"60f401a1":24045,"60f46020":25677,"61935de4":6957,"61d2ee03":20397,"621b1fac":22317,"623d8c02":27885,"6268f1fc":26637,"62ab02d6":17133,"6305257d":16653,"63479cb6":7437,"644f87f7":7629,"647b6aa3":16557,"64c24491":24333,"64e54d1b":9069,"651d519c":6573,"6521e423":23949,"652217d9":21741,"652bc3c6":24813,"652f59ac":7293,"6559ffa3":21741,"6565165a":18765,"65ef1189":24429,"664497ff":20973,"66e30871":9645,"66f22923":25485,"672ba710":17421,"6755401f":3693,"6832dd9c":11661,"689d17e3":21165,"68a86e7c":24429,"68ccaa3f":7629,"69aeb09b":12045,"69d120f9":11277,"6a546565":25005,"6aa5e2a6":24525,"6ac63d3c":7053,"6ae27293":26253,"6afb1b97":13485,"6b0fdd78":20397,"6b339193":7149,"6b6295ae":23373,"6b984206":24621,"6b9dc33e":14637,"6bebf722":48333,"6c9bb35d":8445,"6cc2b68b":18381,"6d79cf39":5901,"6e346345":13965,"6e4deb1b":12045,"6e7307e6":13197,"6eba6cc7":24045,"6f265640":7053,"6f35b02d":17229,"6f916efb":24717,"6fe3f2f3":9165,"7087f307":21837,"70ace839":5613,"71029f0e":24141,"7224d333":24333,"7244acbc":17997,"737f6f75":15981,"73e26a26":22509,"73e4f63c":12141,"73f26e71":5997,"74282aec":11949,"749e2919":21357,"74bff1e3":10797,"75d006b0":20973,"76cdc568":22029,"76df2347":25485,"772b8880":14253,"77704f09":7053,"78ada3f2":9357,"79684e06":24141,"79cdfe1a":15213,"7a00b971":17805,"7a2b22c2":9069,"7a347b0a":43437,"7a851f8b":7149,"7a878fff":22221,"7b663459":22317,"7c7955b8":21165,"7c82fce5":5901,"7c84d489":25101,"7ce43c38":72813,"7d42f834":11469,"7dd7941a":11277,"7e2eb525":13869,"7e3ad334":13965,"7e5b34ac":21261,"7ea7463e":48429,"7eadb484":12429,"7f5d4783":24237,"7fafb60d":25293,"7fd6de0a":7821,"7fee381d":10317,"8020f4da":24525,"80e8f469":12909,"815f3f19":41997,"81919def":9741,"82177157":25485,"823155e8":24621,"8262529f":37101,"829a2da9":15885,"83ad36cb":16365,"83f64d47":63885,"84322572":10989,"845c5a41":17229,"845dfc76":22989,"850f0b72":5613,"85380953":24141,"85592793":40413,"8579d53d":12909,"85aba023":14541,"85b0ca94":31629,"86c6118e":16461,"86e30629":18573,"86f1d327":13581,"88968b3e":22701,"89d8cd0b":23853,"8a2514ec":25965,"8a5643cd":23661,"8a75edce":6765,"8a7a2c5a":25101,"8b611e3c":15981,"8be5b8c4":24237,"8c48be1d":25581,"8c7f3ae1":22989,"8d115c8d":12525,"8d1de29c":16365,"8d6429eb":14925,"8dd0d333":26637,"8e573872":14925,"8ead3f11":49581,"8ec4e27f":34509,"900c3369":20685,"921d409f":20781,"92a7ad62":20205,"93169aa2":10989,"9334e74b":14061,"93e228a5":6861,"93fccb74":9933,"93ff842a":22509,"9452465d":26253,"94a5c4a8":17613,"94ca0cdd":22029,"94d5326f":4365,"94f5dd3c":22509,"94fc099d":21261,"954f42b3":25389,"955beac2":20397,"957c04df":15405,"9595f356":11661,"96936059":10029,"9754b4e3":24813,"97fb7b66":37533,"9889ffaa":14925,"98999361":22221,"98d78510":15021,"98dda9a1":25293,"9938e08c":20013,"99cadd07":7245,"9abff8c0":18093,"9afd6a23":28941,"9b8e3679":20973,"9ba74bed":20205,"9bde3a47":31197,"9c0300a2":11469,"9c5a6d60":11853,"9cdaa8f0":24237,"9d3ff9a1":8109,"9d41a560":25101,"9d7aba60":24429,"9dcf6e6b":16845,"9de75469":14733,"9e2628ad":9549,"9e3cc9bf":20589,"9e4fe43c":25101,"9f32d3da":5613,"9f51d948":12717,"a0374dcf":21741,"a0572083":6861,"a0869e8d":9453,"a1b465d8":18477,"a1c2e1d9":11901,"a1f685d4":21261,"a24fa9cc":12429,"a2a7dd74":34797,"a2e1d692":8013,"a2f2a08a":25869,"a358d7aa":25581,"a36b95f9":20973,"a3d575a6":17037,"a4600850":19341,"a4d534d5":7053,"a4d5fb3e":17901,"a4fd6554":5997,"a54d83b5":7053,"a657f70e":14925,"a6fe297e":21837,"a7a04298":15357,"a7a9a89a":24909,"a7d9d18d":21357,"a89ef0fe":12237,"a9c2783c":6669,"aa02d8ee":9165,"aa1bbe82":14733,"aac67f8e":7053,"aada671b":34893,"ab4fc514":22605,"ab658a5a":3693,"ac776ecf":6669,"accbc6b2":16653,"ad6df964":12765,"ae98d056":21549,"af4b75e9":21165,"af9f5c35":22269,"b0231f2a":14829,"b0252779":25581,"b0843d79":21549,"b0894f60":11661,"b0a920e1":25869,"b0c6670d":5805,"b1114325":13197,"b182685b":16557,"b1a3d4cd":22125,"b1a5d284":13485,"b1b6de8a":21837,"b2764e19":17133,"b2f0c22c":24717,"b39878af":12813,"b3b3e58e":25293,"b3e890da":20973,"b440c7cb":22605,"b45179af":25197,"b471e216":8301,"b4ccbf03":12621,"b4d5355c":25005,"b4fecfe3":24861,"b5376984":22557,"b5e53bc2":6957,"b60d570b":11901,"b6677a84":12525,"b7a981f3":21645,"b7d63f21":8205,"b94b3f9a":9165,"ba162b2a":24717,"ba43fd41":6765,"ba5b3c3b":4845,"ba6fb04d":18765,"bab8f4b7":8781,"bad91654":3597,"bb15d97d":21069,"bb2f92db":11277,"bc079c77":22125,"bcf381cf":17037,"bd027021":3693,"bd847182":22221,"be9f4413":25581,"befa6ee1":6573,"bf96bcc6":21837,"bfe76df4":6861,"c0d326e8":29757,"c200c6ab":17949,"c2204c05":23181,"c2f16508":22029,"c35e1c20":13773,"c46ac345":22029,"c5ba55fe":20877,"c68cb3de":11469,"c795d0d8":15309,"c8033aa1":6381,"c8342bc7":21837,"c913c2d2":13869,"c9b7a6d3":15021,"ca69c6c0":24525,"cabb5ead":11469,"cac77566":17517,"cb73f3d3":8685,"cbebd934":19245,"cc5dcaeb":37965,"cc960e00":13965,"ccc2e63a":9021,"cf0342c2":41325,"d05af215":18381,"d05af99d":6381,"d06ead4f":25389,"d080ead8":19341,"d0b72dd7":18813,"d1870993":13869,"d27c4afb":11085,"d281d38f":26733,"d2b01c15":23661,"d32f0fa6":21933,"d40d98b3":22029,"d4a9b5d6":41133,"d4df3b82":24909,"d5b39d86":4077,"d62b35bf":14157,"d67ddec6":14637,"d70bb09a":23133,"d746f41b":22125,"d79a0692":22413,"d7ef18d9":22605,"d8186546":6285,"d81c0d53":17517,"d85fadc6":12525,"d875725d":5805,"d87a30ca":23949,"d8b5d724":6573,"d8d073a5":11661,"d8d6ffef":8493,"d8f79a20":7437,"d9135e94":6573,"d96d2a0b":12141,"d9caa61e":20685,"d9d1446f":17229,"da280a63":6957,"da5cedca":11949,"dc1158ef":25581,"dd0e1f3a":7053,"de1a26ef":22893,"de76dab7":22989,"de88d52e":5997,"de95776f":15981,"deb54a25":7917,"dec33802":12717,"df7cc47b":8109,"e06cca33":18237,"e0824f2a":13005,"e0b6da2f":26253,"e0e67217":14541,"e1966460":24429,"e225832b":24621,"e25128cc":13773,"e255b21c":13677,"e26e1085":10509,"e28b5340":20685,"e2b6ec19":22029,"e36707da":7725,"e37a3105":13581,"e3871e2c":23277,"e3d6db8d":22221,"e423f7fe":20973,"e4ce9bc7":6141,"e4eff165":8205,"e508dcec":21741,"e517e85d":14157,"e5b55442":20301,"e5eb1dba":31917,"e758ce8e":13101,"e7613e6e":24429,"e771b873":9933,"e7998cbd":3213,"e8246b13":6573,"e833eb1a":21357,"e8e1943f":12429,"e9af84ce":12045,"e9e53d1c":20397,"ea485f64":5709,"eb2c67cb":15597,"ec035359":23565,"ec0681c4":6765,"ece1e617":23565,"ed0b9fc4":10797,"ed9ee034":24813,"eda6d797":6765,"eeb09fd7":9933,"eeccaeca":20589,"ef1019da":21549,"f067aa86":12237,"f0a56d9a":21933,"f0dd4d74":19725,"f10f4b83":9549,"f181b8fb":22125,"f1e9bd6c":13005,"f2c379c0":11373,"f35649a3":12525,"f3dcf5f3":23853,"f41df8eb":25197,"f4be769e":17613,"f4eedd09":53373,"f62e078b":15501,"f6e5ed40":18525,"f7c4aeca":14829,"f7e1d82d":15309,"f8162c7f":19677,"f8235de9":7149,"f83d2578":13293,"f893ca80":24621,"f8df743a":77325,"f9453009":21741,"f98ca4d6":25869,"f9f1d0a8":17325,"fa6b4e00":6669,"faa96d51":6477,"fabc3dd8":13581,"fae0283c":24285,"fb7c792a":24909,"fc908c35":10221,"fd29b8c0":21261,"fd3440ec":9165,"fd9dd327":9741,"fdcbb062":6093,"fdfbf10b":15309,"fe0b9bbd":4269,"fe8ee61f":24333,"fee01a22":7725,"fefdd3e0":10221}};
window.LESSON_URLS = {"base":"../","links":{"ciq/0-4":{"ja":"ja/ciq/0-4/","ko":"ko/ciq/0-4/","en":"en/ciq/0-4/"},"ciq/1-1":{"ja":"ja/ciq/1-1/","ko":"ko/ciq/1-1/","en":"en/ciq/1-1/"},"ciq/1-2":{"ja":"ja/ciq/1-2/","ko":"ko/ciq/1-2/","en":"en/ciq/1-2/"},"ciq/1-4":{"ja":"ja/ciq/1-4/","ko":"ko/ciq/1-4/","en":"en/ciq/1-4/"},"passenger/1-1":{"ja":"ja/gnd/1-1/","ko":"ko/gnd/1-1/","en":"en/gnd/1-1/"},"passenger/1-3":{"ja":"ja/gnd/1-3/","ko":"ko/gnd/1-3/","en":"en/gnd/1-3/"},"passenger/1-4":{"ja":"ja/gnd/1-4/","ko":"ko/gnd/1-4/","en":"en/gnd/1-4/"},"passenger/1-5":{"ja":"ja/gnd/1-5/","ko":"ko/gnd/1-5/","en":"en/gnd/1-5/"},"passenger/1-6":{"ja":"ja/gnd/1-6/","ko":"ko/gnd/1-6/","en":"en/gnd/1-6/"},"passenger/1-7":{"ja":"ja/gnd/1-7/","ko":"ko/gnd/1-7/","en":"en/gnd/1-7/"},"passenger/1-8":{"ja":"ja/gnd/1-8/","ko":"ko/gnd/1-8/","en":"en/gnd/1-8/"},"passenger/1-10":{"ja":"ja/gnd/1-10/","ko":"ko/gnd/1-10/","en":"en/gnd/1-10/"},"passenger/1-12":{"ja":"ja/gnd/1-12/","ko":"ko/gnd/1-12/","en":"en/gnd/1-12/"},"passenger/1-13":{"ja":"ja/gnd/1-13/","ko":"ko/gnd/1-13/","en":"en/gnd/1-13/"},"passenger/2-2":{"ja":"ja/gnd/2-2/","ko":"ko/gnd/2-2/","en":"en/gnd/2-2/"},"passenger/2-3":{"ja":"ja/gnd/2-3/","ko":"ko/gnd/2-3/","en":"en/gnd/2-3/"},"passenger/5-4":{"ja":"ja/gnd/5-4/","ko":"ko/gnd/5-4/","en":"en/gnd/5-4/"},"passenger/5-6":{"ja":"ja/gnd/5-6/","ko":"ko/gnd/5-6/","en":"en/gnd/5-6/"}}};
/* rules.js */
/* 규칙 모듈 — core(공통 원리) / country(JP·KR) / airline(Vela Air, 교육용) / airport
   각 항목: basis = lesson(강좌 근거) | edu(교육용 가상값). 화면 언어와 업무 국가는 별개 */
window.RULES = {
  core: {
    /* passenger/1-3 반드시 확인하는 4항목 */
    docs4: ['validity', 'photo', 'entry', 'ticketName'],
    /* passenger/1-1 위탁 수하물 보안 질문 3가지 */
    dgQ: ['stranger', 'unattended', 'dangerous'],
    /* passenger/1-5 비상구 좌석: 15세 미만·소아/유아 동반 불가 등 */
    exitMinAge: 15,
    /* passenger/1-5 유아는 같은 열(좌우 블록)에 몰리지 않게 — 예비 산소마스크 수 */
    infantPerBlock: 1,
    /* passenger/1-13 Wh = mAh × V ÷ 1000, 100Wh·160Wh 구분, 보조배터리 위탁 금지 */
    wh: function (mAh, v) { return Math.round(mAh * v / 1000 * 10) / 10; },
    pbChecked: false,
    whNoApproval: 100, whMax: 160,
    basis: { docs4: 'passenger/1-3', dgQ: 'passenger/1-1', exit: 'passenger/1-5', lithium: 'passenger/1-13', bags: 'passenger/1-10' }
  },
  country: {
    JP: {
      code: 'JP',
      authority: { ja: '国土交通省 航空局', ko: '국토교통성 항공국', en: 'Civil Aviation Bureau (MLIT)' },
      /* passenger/1-13: 2026-04-24 이후 일본 — 160Wh 이하 1인 2개, 기내 보조배터리 충전 금지(벌칙), 급전·선반 보관은 협력 요청(국토교통성 2026-04-14). 100Wh 초과는 항공사 승인 */
      pb: { maxCarry: 2, basis: 'lesson', ref: 'passenger/1-13', since: '2026-04-24',
            note: { ja: '日本（2026年4月24日〜）：モバイルバッテリーは160Wh以下・1人2個まで（100Wh超は航空会社の承認が必要）。機内でモバイルバッテリーに充電しない（罰則の対象）。ほかの機器への給電をしないこと・頭上の棚に入れないことは協力のお願い（航空会社の指示に従う）。端子は絶縁。',
                    ko: '일본(2026년 4월 24일~): 보조배터리는 160Wh 이하·1인 2개까지(100Wh 초과는 항공사 승인 필요). 기내에서 보조배터리 충전 금지(벌칙 대상). 다른 기기 급전 안 하기·머리 위 선반에 넣지 않기는 협력 요청(항공사 지시에 따름). 단자는 절연.',
                    en: 'Japan (from 24 Apr 2026): power banks up to 160Wh, max 2 per person (over 100Wh needs airline approval). No charging power banks on board (penalties apply). Not powering other devices and not using the overhead bin are requests for cooperation (follow the airline). Insulate the terminals.' } }
    },
    KR: {
      code: 'KR',
      authority: { ja: '韓国 国土交通部', ko: '국토교통부', en: 'Ministry of Land, Infrastructure and Transport (Korea)' },
      /* 국토교통부 발표: 2026-04-20 시행 — 160Wh 이하 1인 2개까지 기내 반입, 기내에서 보조배터리 충전·다른 기기 충전 금지.
         2025-03 시행분(위탁 금지 철저·단자 절연·머리 위 선반 보관 금지)은 계속 적용. 국가 기준과 Vela Air 회사 기준(100Wh 초과 미승인)은 분리 */
      pb: { maxCarry: 2, basis: 'official', ref: 'passenger/1-13', since: '2026-04-20',
            note: { ja: '韓国（2026年4月20日〜）：モバイルバッテリーは160Wh以下・1人2個まで（100Wh超は航空会社の承認が必要）。機内でバッテリー自体の充電も、ほかの機器への充電もしない。受託禁止・端子の絶縁・頭上の棚に入れないこと（2025年3月〜）も続く。',
                    ko: '한국(2026년 4월 20일~): 보조배터리는 160Wh 이하·1인 2개까지(100Wh 초과는 항공사 승인 필요). 기내에서 보조배터리 충전과 다른 기기 충전 모두 금지. 위탁 금지·단자 절연·머리 위 선반 보관 금지(2025년 3월~)도 계속 적용.',
                    en: 'Korea (from 20 Apr 2026): power banks up to 160Wh, max 2 per person (over 100Wh needs airline approval). No charging the power bank or other devices on board. The March 2025 rules (never in checked bags, insulate terminals, not in the overhead bin) still apply.' } }
    }
  },
  /* Vela Air 규정 — 전부 교육용 가상값 (passenger/1-10의 일반 예시 범위 안에서 설정) */
  airline: {
    VELA: {
      name: 'Vela Air', code: 'VELA', /* 4글자: IATA(2자)·ICAO(3자) 어느 형식과도 겹치지 않음 */
      basis: 'edu',
      freeBag: { Y: { pcs: 1, kg: 23 } }, pieceMaxKg: 32, cabinMaxKg: 10,
      excessWeight: { JP: { amt: 12000, cur: 'JPY' }, KR: { amt: 110000, cur: 'KRW' } },
      /* 이름 정정: 철자 오류 3글자 이내는 예약부서 확인 후 정정 가능 (교육용) */
      nameFix: 3,
      /* 100Wh 초과 보조배터리는 카운터에서 승인하지 않음 (Vela Air 회사 기준·교육용 — 국가 기준 160Wh와 별개) */
      pbOver100: false,
      closeMin: 60, boardMin: 35
    }
  },
  airport: {
    NRT: { name: { ja: '成田国際空港', ko: '나리타국제공항', en: 'Narita International' }, country: 'JP', counter: 'K 12', gate: '62', tz: 'JST' },
    ICN: { name: { ja: '仁川国際空港', ko: '인천국제공항', en: 'Incheon International' }, country: 'KR', counter: 'H 12', gate: '27', tz: 'KST' }
  },
  /* 渡航条件 DB — 教育用データ (실제 조건은 Timatic·공적 정보로 확인: passenger/1-3, ciq/1-2) */
  entryDB: {
    KR: { JPN: 'free', KOR: 'citizen', LUM: 'visa' },
    JP: { KOR: 'free', JPN: 'citizen', LUM: 'visa' }
  }
};

/* mission_ci01.js */
/* 미션 pax.ci.01 「はじめてのチェックイン」 — 모든 승객·편·서류는 교육용 가상 데이터
   station JP: VELA 301 NRT→ICN / station KR: VELA 302 ICN→NRT
   관련 레슨: passenger/1-1, 1-3, 1-5, 1-10, 1-12, 1-13, ciq/1-1, ciq/1-2 */
(function () {
  var L = function (ja, ko, en) { return { ja: ja, ko: ko, en: en }; };
  var common = {
    hello: L('おはようございます。仁川までお願いします。', '안녕하세요. 인천까지 부탁드립니다.', 'Good morning. To Incheon, please.'),
    helloJP: L('こんにちは。成田までお願いします。', '안녕하세요. 나리타까지 부탁드립니다.', 'Hello. To Narita, please.'),
    dgNone: L('はい、自分で詰めました。ずっと持っていましたし、そういう物は入っていません。', '네, 제가 직접 쌌어요. 계속 갖고 있었고 그런 물건은 없어요.', 'Yes, I packed it myself. It has been with me the whole time, and there is nothing like that inside.'),
    thanks: L('ありがとうございました！', '감사합니다!', 'Thank you!'),
    waitLong: L('…まだかかりますか？', '…아직 멀었나요?', '…Will this take much longer?'),
    seatOk: L('はい、大丈夫です。ありがとうございます。', '네, 괜찮아요. 감사합니다.', 'Yes, that is fine. Thank you.'),
    seatMeh: L('あ…希望とは違いますけど、大丈夫です。', '아… 희망한 자리는 아니지만 괜찮아요.', 'Oh… not what I asked for, but that is fine.'),
    exitYes: L('はい、大丈夫です。お手伝いします。', '네, 괜찮아요. 도와드릴게요.', 'Yes, no problem. I can help.')
  };
  /* 모든 승객 공통 응답(목소리는 승객별) */
  function withCommon(list) { list.forEach(function (p) { p.say.seatOk = p.say.seatOk || common.seatOk; p.say.seatMeh = p.say.seatMeh || common.seatMeh; p.say.exitYes = p.say.exitYes || common.exitYes; }); return list; }
  function paxJP() {
    return withCommon([
      { id: 'p1', art: 'passenger_female_01', issue: 'tutorial', look: { skin: '#f6d7bf', hair: '#3b2a22', style: 'bob', outfit: '#e9a3a3', g: 'f' },
        pp: { sur: 'SATO', given: 'MISAKI', nat: 'JPN', no: 'XS4825107', dob: '1998-04-12', sex: 'F', exp: '2031-05-12' },
        pnr: { rloc: 'K7QX2M', sur: 'SATO', given: 'MISAKI', title: 'MS', cls: 'Y', ssr: [], req: 'window' },
        bags: [{ kg: 18.4 }], carry: 6.0, dg: 'none',
        say: { hello: common.hello, seat: L('窓側の席だとうれしいです。', '창가 자리면 좋겠어요.', 'A window seat would be great.'), dg: common.dgNone, thanks: common.thanks } },
      { id: 'p2', art: 'passenger_male_02', issue: 'name', look: { skin: '#f3d3b5', hair: '#1f1f24', style: 'short', outfit: '#5a7bb5', g: 'm' },
        pp: { sur: 'KIM', given: 'MINJUN', nat: 'KOR', no: 'M48217730', dob: '1991-11-02', sex: 'M', exp: '2030-02-20' },
        pnr: { rloc: 'P3LW8D', sur: 'KIM', given: 'MINJIN', title: 'MR', cls: 'Y', ssr: [], req: null },
        bags: [{ kg: 21.0 }], carry: 7.5, dg: 'none',
        say: { hello: L('ソウルに帰ります。予約は会社の人がしてくれました。', '서울로 돌아갑니다. 예약은 회사 사람이 해 줬어요.', "I'm heading home to Seoul. Someone at my company booked it."),
               seat: L('どこでも大丈夫です。', '아무 데나 괜찮아요.', 'Anywhere is fine.'), dg: common.dgNone, thanks: common.thanks,
               fix: L('え、名前が違っていましたか？ 直してもらえて助かります。', '어, 이름이 틀렸었나요? 고쳐 주셔서 다행이에요.', 'Oh, was my name wrong? Thanks for fixing it.'),
               rebook: L('えっ、予約を取り直すんですか…。わかりました。', '네? 예약을 다시 해야 하나요…. 알겠습니다.', 'What, I have to book again…? All right.') } },
      { id: 'p3', art: 'passenger_female_03_infant_01', photo: 'female_03', voice: 'passenger_female_03', issue: 'infantExit',   /* 25차b(GPT 25-R02 후속): 아기를 안은 그림(Day 3과 같은 그림) — 여권 사진·목소리는 본인(예전 그림의 음성 그대로) */
        look: { skin: '#f7dcc6', hair: '#5a3a28', style: 'long', outfit: '#8cc5a8', g: 'f', baby: true },
        pp: { sur: 'TANAKA', given: 'HARUKA', nat: 'JPN', no: 'XT1093384', dob: '1961-07-30', sex: 'F', exp: '2029-09-01' },
        inf: { sur: 'TANAKA', given: 'SORA', dob: '2025-12-04', no: 'XT5520918', exp: '2030-12-01', photo: 'infant_01', rel: L('祖母と孫', '할머니와 손주', 'grandmother and grandchild') },   /* 25차(GPT 업무 정확성): Day 1 유아도 여권 사진·동반 관계 표시 */
        pnr: { rloc: 'H9NB4C', sur: 'TANAKA', given: 'HARUKA', title: 'MRS', cls: 'Y', ssr: ['INFT TANAKA/SORA 04DEC25'], req: 'exit' },
        bags: [{ kg: 22.0 }, { kg: 6.5, stroller: true }], carry: 5.0, dg: 'none',
        say: { hello: L('まだ赤ちゃんの孫と一緒です。足元の広い非常口の席にしてもらえますか？', '아기 손주와 함께 왔어요. 다리 공간이 넓은 비상구 좌석으로 해 주실 수 있나요?', "I'm travelling with my baby grandchild. Could I have an exit row seat for the legroom?"),
               seat: L('足元の広い非常口の席は、空いていますか？', '다리 공간이 넓은 비상구 좌석이 비어 있나요?', 'Is an exit row seat with more legroom available?'),
               exitNoReply: L('そうなんですね。じゃあ、前の方の通路側でお願いします。', '그렇군요. 그럼 앞쪽 통로 쪽으로 부탁해요.', 'I see. Then a seat near the front on the aisle, please.'),
               dg: common.dgNone, thanks: common.thanks } },
      { id: 'p4', art: 'passenger_male_03', issue: 'battery', look: { skin: '#efcfb2', hair: '#2b2b2b', style: 'short', outfit: '#3d4e63', g: 'm', tie: true },
        pp: { sur: 'ITO', given: 'KENJI', nat: 'JPN', no: 'XR7731150', dob: '1962-02-18', sex: 'M', exp: '2032-03-03' },
        pnr: { rloc: 'B2ZT6R', sur: 'ITO', given: 'KENJI', title: 'MR', cls: 'Y', ssr: [], req: 'aisle' },
        bags: [{ kg: 16.8 }], carry: 7.0, dg: 'pb', pb: [{ mAh: 10000, v: 3.7 }, { mAh: 20000, v: 3.7 }, { mAh: 30000, v: 3.7 }],
        say: { hello: L('出張です。通路側でお願いします。', '출장입니다. 통로 쪽으로 부탁합니다.', "I'm on a business trip. An aisle seat, please."),
               seat: L('通路側で。', '통로 쪽으로요.', 'Aisle, please.'),
               dg: L('はい、自分で詰めて、ずっと持っていました。あ、電池…モバイルバッテリーなら、スーツケースに3つ入れています。', '네, 직접 쌌고 계속 갖고 있었어요. 아, 배터리… 보조배터리라면 캐리어에 3개 넣었어요.', 'Yes, I packed it and it has been with me. Oh, batteries… I have three power banks in my suitcase.'),
               pbShip: L('わかりました。送れるかどうか、案内された窓口で確認します。', '알겠습니다. 안내받은 창구에서 배송 가능한지 확인할게요.', "All right. I'll check at the counter you mentioned whether it can be shipped."),
               pbDiscard: L('そうですか…。では、指定の手順で処分をお願いします。', '그렇군요…. 그럼 지정된 절차에 따라 처리해 주세요.', 'I see… Then please dispose of it under the proper procedure.'),
               thanks: common.thanks } },
      { id: 'p5', art: 'passenger_male_01', issue: 'overweight', look: { skin: '#f2d2b6', hair: '#6b4a2b', style: 'short', outfit: '#d8b45a', g: 'm' },
        pp: { sur: 'NAKAMURA', given: 'YUTO', nat: 'JPN', no: 'XS6602841', dob: '2001-09-09', sex: 'M', exp: '2033-01-15' },
        pnr: { rloc: 'Z5MC1K', sur: 'NAKAMURA', given: 'YUTO', title: 'MR', cls: 'Y', ssr: [], req: null },
        bags: [{ kg: 27.6 }], carry: 5.0, dg: 'none',
        say: { hello: L('留学先に戻ります。荷物が多くて…', '유학 가는 곳으로 돌아가요. 짐이 많아서…', "I'm going back to my university. I have a lot of luggage…"),
               seat: L('どこでもいいです。', '아무 데나 좋아요.', 'Anywhere.'), dg: common.dgNone, thanks: common.thanks,
               pay: L('わかりました、払います。', '알겠습니다, 낼게요.', 'OK, I\'ll pay.'),
               move: L('手荷物に移します。ちょっと待ってください。', '기내 가방으로 옮길게요. 잠깐만요.', "I'll move some into my carry-on. Just a moment.") } },
      { id: 'p6', art: 'passenger_female_02', issue: 'visa', look: { skin: '#e6b893', hair: '#b07a3a', style: 'long', outfit: '#7b6fb0', g: 'f' },
        pp: { sur: 'ARDEN', given: 'LISA', nat: 'LUM', no: 'LM0284471', dob: '1995-06-21', sex: 'F', exp: '2031-08-30' },
        visa: { dest: 'KR', type: 'C-3', until: '2026-10-08' },
        pnr: { rloc: 'Q8RD3V', sur: 'ARDEN', given: 'LISA', title: 'MS', cls: 'Y', ssr: [], req: null },
        bags: [{ kg: 19.2 }], carry: 6.0, dg: 'none',
        say: { hello: L('ソウルの友だちに会いに行きます。', '서울에 있는 친구를 만나러 가요.', "I'm visiting a friend in Seoul."),
               seat: L('どこでも。', '아무 데나요.', 'Anywhere.'), dg: common.dgNone, thanks: common.thanks,
               plea: L('2日過ぎただけです…何とかなりませんか？', '이틀 지났을 뿐인데… 어떻게 안 될까요?', "It's only two days over… isn't there anything you can do?"),
               denyOk: L('…わかりました。お話を聞きます。', '…알겠습니다. 설명을 들을게요.', '…All right. I will listen.') } }
    ]);
  }
  /* 한국 근무지: 같은 구조, 국적·목적지·통화가 바뀜 */
  function paxKR() {
    var P = paxJP();
    var map = {
      p1: { pp: { sur: 'PARK', given: 'JIYEON', nat: 'KOR', no: 'M20481577' }, pnr: { sur: 'PARK', given: 'JIYEON' }, look: { hair: '#2a1f1a' } },
      p2: { pp: { sur: 'SATO', given: 'TAKUMI', nat: 'JPN', no: 'XS3301926', sex: 'M' }, pnr: { sur: 'SATOU', given: 'TAKUMI' } },
      p3: { pp: { sur: 'LEE', given: 'SEOYEON', nat: 'KOR', no: 'M77310452' }, inf: { sur: 'LEE', given: 'DOYUN', no: 'M90122774' }, pnr: { sur: 'LEE', given: 'SEOYEON', ssr: ['INFT LEE/DOYUN 04DEC25'] } },
      p4: { pp: { sur: 'CHOI', given: 'HYUNWOO', nat: 'KOR', no: 'M51188206' }, pnr: { sur: 'CHOI', given: 'HYUNWOO' } },
      p5: { pp: { sur: 'JUNG', given: 'MINHO', nat: 'KOR', no: 'M66040139' }, pnr: { sur: 'JUNG', given: 'MINHO' } },
      p6: { visa: { dest: 'JP', type: 'SHORT-TERM', until: '2026-10-08' } }
    };
    P.forEach(function (p) {
      var m = map[p.id]; if (!m) return;
      ['pp', 'pnr', 'look', 'inf'].forEach(function (k) { if (m[k]) p[k] = Object.assign({}, p[k] || {}, m[k]); });
      if (m.visa) p.visa = m.visa;
      if (p.say.hello === common.hello) p.say.hello = common.helloJP;
    });
    P[1].say.hello = L('東京の家に帰ります。予約は旅行会社です。', '도쿄 집으로 돌아갑니다. 예약은 여행사에서 했어요.', "I'm going home to Tokyo. A travel agency made the booking.");
    P[3].say.hello = L('出張です。通路側でお願いします。', '출장입니다. 통로 쪽으로 부탁합니다.', "I'm on a business trip. An aisle seat, please.");
    P[4].say.hello = L('日本の大学に戻ります。荷物が多くて…', '일본 대학으로 돌아가요. 짐이 많아서…', "I'm going back to my university in Japan. Lots of luggage…");
    P[5].say.hello = L('東京の友だちに会いに行きます。', '도쿄 친구를 만나러 가요.', "I'm visiting a friend in Tokyo.");
    return P;
  }
  window.MISSION_CI01 = {
    id: 'pax.ci.01', module: 'checkin', level: 'agent',
    lessons: ['passenger/1-1', 'passenger/1-3', 'passenger/1-5', 'passenger/1-10', 'passenger/1-13', 'ciq/1-1', 'ciq/1-2'],
    date: '2026-10-10',
    variants: {
      JP: { flight: 'VELA 301', from: 'NRT', to: 'ICN', std: '10:30', start: '08:40', close: '09:30', board: '09:55', destC: 'KR', pax: paxJP },
      KR: { flight: 'VELA 302', from: 'ICN', to: 'NRT', std: '13:30', start: '11:40', close: '12:30', board: '12:55', destC: 'JP', pax: paxKR }
    },
    aircraft: { type: 'B737-800', rows: 30, cols: 'ABCDEF', exitRows: [14, 15], inop: ['22C'],
                /* 사전 배정 좌석(교육용): 8열 ABC 블록에 유아 동반 승객 1명 */
                taken: ['1A', '1B', '1C', '2D', '2E', '3A', '4F', '5C', '5D', '6A', '6B', '7E', '8A', '8B', '9F', '10C', '10D', '11A', '12B', '12E', '13F', '16A', '16B', '17C', '18D', '19A', '19F', '20B', '21E', '23A', '24C', '24D', '25F', '26A', '27B', '28E', '29C', '30D'],
                infantSeats: ['8B'] },
    /* 행동별 소요 시간(게임 내 분) */
    cost: { greet: 0.3, pnr: 0.5, passport: 0.6, entry: 0.5, seat: 0.5, weigh: 0.5, tag: 0.3, dg: 0.4, bp: 0.4 }
  };
})();

/* mission_ci02.js */
/* 미션 pax.ci.02 「忙しい朝」(체크인편 Day 2) — 모든 승객·편·서류는 교육용 가상 데이터
   - 승객 9명을 시드로 조합(같은 시드 = 같은 조합 → 검수·재현용)
   - 국적은 서류 데이터. 그림 인물은 사례에 맞게 배정(오래된 사진 = male_02, 닮은 형제 = male_10 …)
   - 합의본 v3 3장 참고 */
(function () {
  'use strict';
  var L = function (ja, ko, en) { return { ja: ja, ko: ko, en: en }; };
  var C = {
    dgNone: L('はい、自分で詰めました。ずっと持っていましたし、そういう物は入っていません。', '네, 제가 직접 쌌어요. 계속 갖고 있었고 그런 물건은 없어요.', 'Yes, I packed it myself. It has been with me the whole time, and there is nothing like that inside.'),
    thanks: L('ありがとうございました！', '감사합니다!', 'Thank you!'),
    seatOk: L('はい、大丈夫です。ありがとうございます。', '네, 괜찮아요. 감사합니다.', 'Yes, that is fine. Thank you.'),
    seatMeh: L('あ…希望とは違いますけど、大丈夫です。', '아… 희망한 자리는 아니지만 괜찮아요.', 'Oh… not what I asked for, but that is fine.'),
    exitYes: L('はい、大丈夫です。お手伝いします。', '네, 괜찮아요. 도와드릴게요.', 'Yes, no problem. I can help.'),
    seatWin: L('窓側がいいです。', '창가가 좋아요.', 'Window, please.'),
    seatAisle: L('通路側でお願いします。', '통로 쪽으로 부탁해요.', 'Aisle, please.'),
    seatAny: L('どこでも大丈夫です。', '아무 데나 괜찮아요.', 'Anywhere is fine.')
  };
  /* 그림 인물별 신원(근무지별). 이름·국적은 서류 데이터일 뿐, 외모로 국적을 판정하지 않음 */
  var ID = {
    JP: {
      passenger_female_01: { sur: 'TAKAHASHI', given: 'YUI', nat: 'JPN', dob: '1997-02-08', sex: 'F', title: 'MS' },
      passenger_female_02: { sur: 'MORI', given: 'KAREN', nat: 'JPN', dob: '1994-07-19', sex: 'F', title: 'MS' },
      passenger_female_03: { sur: 'YAMADA', given: 'SETSUKO', nat: 'JPN', dob: '1959-03-30', sex: 'F', title: 'MRS' },
      passenger_female_04: { sur: 'ISHII', given: 'MAI', nat: 'JPN', dob: '1992-06-11', sex: 'F', title: 'MS' },
      passenger_male_01: { sur: 'HAN', given: 'JIHOON', nat: 'KOR', dob: '2000-05-14', sex: 'M', title: 'MR' },
      passenger_male_02: { sur: 'YOON', given: 'SEUNGHO', nat: 'KOR', dob: '1991-11-02', sex: 'M', title: 'MR' },
      passenger_male_03: { sur: 'SUZUKI', given: 'MASARU', nat: 'JPN', dob: '1962-09-03', sex: 'M', title: 'MR' },
      passenger_male_04: { sur: 'NAKANO', given: 'RIKU', nat: 'JPN', dob: '2002-08-25', sex: 'M', title: 'MR' },
      passenger_male_05: { sur: 'OGAWA', given: 'HIROSHI', nat: 'JPN', dob: '1971-12-01', sex: 'M', title: 'MR' },
      passenger_male_10: { sur: 'FUJITA', given: 'KENTA', nat: 'JPN', dob: '1985-04-17', sex: 'M', title: 'MR', bro: { given: 'SHOTA', dob: '1988-01-09' } }
    },
    KR: {
      passenger_female_01: { sur: 'KANG', given: 'SOMIN', nat: 'KOR', dob: '1998-01-22', sex: 'F', title: 'MS' },
      passenger_female_02: { sur: 'SEO', given: 'YUNA', nat: 'KOR', dob: '1995-03-03', sex: 'F', title: 'MS' },
      passenger_female_03: { sur: 'BAEK', given: 'YOUNGJA', nat: 'KOR', dob: '1960-10-05', sex: 'F', title: 'MRS' },
      passenger_female_04: { sur: 'HWANG', given: 'JIWON', nat: 'KOR', dob: '1992-09-15', sex: 'F', title: 'MS' },
      passenger_male_01: { sur: 'KATO', given: 'SHO', nat: 'JPN', dob: '2001-06-30', sex: 'M', title: 'MR' },
      passenger_male_02: { sur: 'YOON', given: 'SEUNGHO', nat: 'KOR', dob: '1991-11-02', sex: 'M', title: 'MR' },
      passenger_male_03: { sur: 'KWON', given: 'TAESIK', nat: 'KOR', dob: '1962-02-14', sex: 'M', title: 'MR' },
      passenger_male_04: { sur: 'LIM', given: 'JUNHO', nat: 'KOR', dob: '2002-04-09', sex: 'M', title: 'MR' },
      passenger_male_05: { sur: 'NAM', given: 'GIDONG', nat: 'KOR', dob: '1971-08-19', sex: 'M', title: 'MR' },
      passenger_male_10: { sur: 'OH', given: 'JAEHYUN', nat: 'KOR', dob: '1985-12-03', sex: 'M', title: 'MR', bro: { given: 'JAEMIN', dob: '1988-05-27' } }
    }
  };
  var ARTS = Object.keys(ID.JP);
  /* 출제 그룹 — 그룹마다 무작위 선택 */
  var GROUPS = [
    { k: 'doc', pick: 1, from: ['expired', 'shortValid'] },
    { k: 'id', pick: 1, from: ['oldPhoto', 'brother'] },
    { k: 'conn', pick: 1, from: ['through', 'noEsta'] },
    { k: 'bag', pick: 2, from: ['golf', 'carry', 'overweight', 'battery'] },
    { k: 'misc', pick: 1, from: ['pair', 'name'] }
  ];
  var ART_FOR = { oldPhoto: 'passenger_male_02', brother: 'passenger_male_10', golf: 'passenger_male_05', carry: 'passenger_male_04', through: 'passenger_female_04', noEsta: 'passenger_female_04' };

  function shuffle(a, r) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pnum(nat, r) { var n = String(Math.floor(r() * 9000000) + 1000000); return nat === 'JPN' ? 'T' + 'RSKZ'.charAt(Math.floor(r() * 4)) + n : 'M' + n + Math.floor(r() * 10); }
  function rloc(r) { var A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', s = ''; for (var i = 0; i < 6; i++) s += A.charAt(Math.floor(r() * A.length)); return s; }

  /* 시드 → 승객 9명 */
  function build(country, seed) {
    var DY = window.SAGA_DAYS, r = DY.rng(seed), V = M.variants[country];
    var cases = [];
    GROUPS.forEach(function (g) { shuffle(g.from.slice(), r).slice(0, g.pick).forEach(function (c) { cases.push(c); }); });
    var freeArts = shuffle(ARTS.slice(), r);
    function take(art) { var i = art ? freeArts.indexOf(art) : 0; if (i < 0) i = 0; return freeArts.splice(i, 1)[0]; }
    /* 고정 인물이 필요한 사례부터 */
    cases.sort(function (a, b) { return (ART_FOR[b] ? 1 : 0) - (ART_FOR[a] ? 1 : 0); });
    var slots = [];
    cases.forEach(function (c) {
      if (c === 'pair') { slots.push({ cases: ['pairA'], art: take() }); slots.push({ cases: ['pairB'], art: take() }); return; }
      slots.push({ cases: [c], art: take(ART_FOR[c]) });
    });
    while (slots.length < 9) slots.push({ cases: [], art: take() });
    /* 복합 1건: 남은 기간이 짧은 여권(정상)을 수하물 사례 승객 1명에게 덧붙이는 경우가 있음 */
    if (cases.indexOf('shortValid') < 0 && r() < .5) { var bs = slots.filter(function (s) { return /golf|overweight/.test(s.cases[0] || ''); }); if (bs.length) bs[0].cases.push('shortValid'); }
    /* 순서: 일행(pair)은 붙여서, 나머지는 섞음 */
    var pairA = slots.filter(function (s) { return s.cases[0] === 'pairA'; })[0], pairB = slots.filter(function (s) { return s.cases[0] === 'pairB'; })[0];
    var rest = shuffle(slots.filter(function (s) { return s !== pairA && s !== pairB; }), r);
    if (pairA) { var at = 1 + Math.floor(r() * (rest.length - 1)); rest.splice(at, 0, pairA, pairB); }
    var list = rest.map(function (s, i) { return person(s, i, country, r, V); });
    if (pairA) { var a = list.filter(function (p) { return p.pair && p.pair.role === 'a'; })[0], b = list.filter(function (p) { return p.pair && p.pair.role === 'b'; })[0]; a.pair.mate = b.id; b.pair.mate = a.id; b.pair.mateName = a.pp.sur + ' ' + a.pp.given; b.say.hello = sayPairB(a); b.pnr.remark = 'TCP ' + a.pnr.rloc + ' ' + a.pp.sur + '/' + a.pp.given; a.pnr.remark = 'TCP ' + b.pnr.rloc + ' ' + b.pp.sur + '/' + b.pp.given; }
    list.seed = seed; list.cases = cases;
    return list;
  }

  function person(s, i, country, r, V) {
    var id = ID[country][s.art], toKR = country === 'JP';
    var p = { id: 'd2p' + (i + 1), art: s.art, issues: s.cases.slice(), look: null,
      pp: { sur: id.sur, given: id.given, nat: id.nat, no: pnum(id.nat, r), dob: id.dob, sex: id.sex, exp: (2028 + Math.floor(r() * 8)) + '-0' + (1 + Math.floor(r() * 9)) + '-' + (10 + Math.floor(r() * 18)) },
      pnr: { rloc: rloc(r), sur: id.sur, given: id.given, title: id.title, cls: 'Y', ssr: [], req: [null, 'window', 'aisle'][Math.floor(r() * 3)] },
      ret: toKR ? 'VELA 302 ' + (14 + Math.floor(r() * 4)) + 'OCT ICNNRT' : 'VELA 301 ' + (14 + Math.floor(r() * 4)) + 'OCT NRTICN',
      bags: [{ kg: Math.round((14 + r() * 8) * 10) / 10, prop: ['prop_luggage_01', 'prop_luggage_02', 'prop_luggage_03', 'prop_duffel_01'][Math.floor(r() * 4)] }],
      carry: Math.round((4 + r() * 4) * 10) / 10, carryProp: 'prop_cabin_bag_01', dg: 'none', idMatch: true,
      say: { hello: hello(id, toKR, r), dg: C.dgNone, thanks: C.thanks, seatOk: C.seatOk, seatMeh: C.seatMeh, exitYes: C.exitYes } };
    if (p.pp.nat === (toKR ? 'KOR' : 'JPN')) p.say.hello = helloHome(toKR, r);
    s.cases.forEach(function (c) { (CASE[c] || function () {})(p, id, toKR, r); });
    p.say.seat = p.say.seat || { window: C.seatWin, aisle: C.seatAisle }[p.pnr.req] || C.seatAny;
    return p;
  }
  function hello(id, toKR, r) {
    var a = toKR ? [L('おはようございます。仁川までお願いします。', '안녕하세요. 인천까지 부탁드립니다.', 'Good morning. To Incheon, please.'), L('ソウルに旅行です。よろしくお願いします。', '서울로 여행 가요. 잘 부탁드립니다.', 'I am off to Seoul on a trip. Thank you.'), L('出張でソウルへ行きます。', '출장으로 서울에 가요.', 'I am going to Seoul on business.')]
      : [L('こんにちは。成田までお願いします。', '안녕하세요. 나리타까지 부탁드립니다.', 'Hello. To Narita, please.'), L('東京に遊びに行きます。', '도쿄에 놀러 가요.', 'I am visiting Tokyo for fun.'), L('出張で東京へ行きます。', '출장으로 도쿄에 가요.', 'I am going to Tokyo on business.')];
    return a[Math.floor(r() * a.length)];
  }
  function helloHome(toKR, r) { return toKR ? L('ソウルの家に帰ります。', '서울 집으로 돌아가요.', 'I am heading home to Seoul.') : L('東京の家に帰ります。', '도쿄 집으로 돌아가요.', 'I am going home to Tokyo.'); }
  function sayPairB(a) { return L('前の' + a.pp.sur + 'さんの連れです。予約は別ですが、隣の席にしてもらえますか？', '앞의 ' + a.pp.sur + ' 씨 일행이에요. 예약은 따로지만 옆자리로 해 주실 수 있나요?', 'I am travelling with ' + a.pp.sur + ' ahead of me. We booked separately — could we sit together?'); }

  /* 사례별 데이터 */
  var CASE = {
    /* D2-01 출발일에 이미 만료 */
    expired: function (p) {
      p.pp.exp = '2026-09-28';
      p.say.plea = L('えっ、切れてたんですか…気づきませんでした。', '네? 만료됐었어요…? 몰랐어요.', 'What, it has expired…? I had no idea.');
      p.say.denyOk = L('…わかりました。更新の方法を教えてください。', '…알겠습니다. 갱신 방법을 알려 주세요.', '…I see. Please tell me how to renew it.');
    },
    /* D2-01b 남은 기간은 짧지만 귀국일까지 유효 → 정상 */
    shortValid: function (p) { p.pp.exp = '2026-12-08'; },
    /* D2-02 같은 사람의 오래된 사진(10년 여권 만료 직전) */
    oldPhoto: function (p) {
      p.photo = 'male_02_old'; p.pp.exp = '2026-11-20'; p.issued = '2016-11-21';
      p.say.more = L('はい、1991年11月2日です。免許証もあります。', '네, 1991년 11월 2일이에요. 운전면허증도 있어요.', 'Yes, 2 November 1991. I have my driving licence too.');
      p.say.hello = L('パスポートの写真、だいぶ前のなんです。', '여권 사진이 꽤 오래된 거예요.', 'The photo in my passport is quite old.');
    },
    /* D2-03 닮은 형제의 여권(예약도 형제 이름) */
    brother: function (p, id) {
      p.photo = 'male_10_brother'; p.idMatch = false; p.pp.given = id.bro.given; p.pp.dob = id.bro.dob; p.pnr.given = id.bro.given;
      p.say.more = L('えっと…生年月日ですか…ちょっと待ってください。', '어… 생년월일이요… 잠깐만요.', 'Er… my date of birth…? Just a moment.');
      p.say.denyOk = L('…わかりました。', '…알겠습니다.', '…All right.');
      p.say.accuse = L('そんな言い方しなくても…。', '그렇게 말씀하지 않으셔도…', 'There is no need to put it like that…');
    },
    /* D2-04 스루 체크인 — 미국은 비자 면제 프로그램(VWP) 이용 사례: ESTA 승인 필요 */
    through: function (p, id, toKR) {
      p.conn = toKR ? { flight: 'ORN 088', from: 'ICN', to: 'HNL', dep: '15:40', arr: '07:55', mct: 60, cnx: 165, esta: 'approved' }
                    : { flight: 'ORN 052', from: 'NRT', to: 'HNL', dep: '20:15', arr: '08:10', mct: 60, cnx: 265, esta: 'approved' };
      delete p.ret;
      p.say.hello = toKR ? L('仁川で乗り継いで、ホノルルまで行きます。', '인천에서 갈아타고 호놀룰루까지 가요.', 'I am connecting in Incheon, through to Honolulu.') : L('成田で乗り継いで、ホノルルまで行きます。', '나리타에서 갈아타고 호놀룰루까지 가요.', 'I am connecting in Narita, through to Honolulu.');
      p.say.esta = L('ESTAは先週取りました。', 'ESTA는 지난주에 받았어요.', 'I got my ESTA last week.');
    },
    noEsta: function (p, id, toKR) {
      CASE.through(p, id, toKR); p.conn.esta = 'none';
      p.say.esta = L('ESTA…？ 乗り継ぎだけだから要らないと思っていました。', 'ESTA…? 환승만 하니까 필요 없는 줄 알았어요.', 'ESTA…? I thought I did not need one since I am only connecting.');
      p.say.denyOk = L('わかりました。すぐ申請してみます。', '알겠습니다. 바로 신청해 볼게요.', 'All right. I will apply right away.');
    },
    /* D2-05 골프백 — 일반 수하물 1개로 계산(2개째 요금) */
    golf: function (p, id, toKR, r) {
      p.bags = [{ kg: Math.round((15 + r() * 5) * 10) / 10, prop: 'prop_luggage_02' }, { kg: Math.round((12 + r() * 4) * 10) / 10, prop: 'prop_golfbag_01', golf: true }];
      p.say.hello = toKR ? L('ゴルフ旅行です。ゴルフバッグも預けます。', '골프 여행이에요. 골프백도 맡길게요.', 'A golf trip — I am checking my golf bag too.') : L('ゴルフ旅行の帰りです。ゴルフバッグも預けます。', '골프 여행 다녀오는 길이에요. 골프백도 맡길게요.', 'On my way back from a golf trip — the golf bag goes in too.');
      p.say.golfOk = L('2個目は料金がかかるんですね。わかりました。', '2개째는 요금이 드는군요. 알겠습니다.', 'So the second piece is charged. Understood.');
    },
    /* D2-06 기내 가방 초과(위탁 짐 없음, 기내 가방 안에 보조배터리) */
    carry: function (p, id, toKR, r) {
      p.bags = []; p.carry = Math.round((11.8 + r() * 2) * 10) / 10; p.carryProp = 'prop_luggage_03'; p.carryPB = true;
      p.say.hello = L('荷物はこれだけです。機内に持ち込みます。', '짐은 이것뿐이에요. 기내에 들고 탈게요.', 'This is all I have. I will take it on board.');
      p.say.carryOk = L('じゃあ預けます。バッテリーとパソコンは出しますね。', '그럼 맡길게요. 배터리랑 노트북은 꺼낼게요.', 'Then I will check it. I will take out the battery and laptop.');
    },
    /* Day 1 복습 유형 */
    overweight: function (p, id, toKR, r) {
      p.bags[0].kg = Math.round((25 + r() * 4) * 10) / 10; p.carry = 4.5;
      p.say.pay = L('払います。', '낼게요.', 'I will pay.');
      p.say.move = L('じゃあ、少し手荷物に移します。', '그럼 조금 기내 가방으로 옮길게요.', 'Then I will move a few things to my carry-on.');
    },
    battery: function (p) {
      p.dg = 'pb'; p.pb = [{ mAh: 10000, v: 3.7 }, { mAh: 20000, v: 3.7 }, { mAh: 30000, v: 3.7 }];
      p.say.dg = L('自分で詰めました。…あ、モバイルバッテリーをスーツケースに3つ入れています。', '제가 쌌어요. …아, 보조배터리를 캐리어에 3개 넣었어요.', 'I packed it myself. …Oh, there are three power banks in the suitcase.');
      p.say.pbShip = L('宅配カウンターで聞いてみます。', '택배 창구에서 물어볼게요.', 'I will ask at the delivery counter.');
      p.say.pbDiscard = L('わかりました、手放します。', '알겠습니다, 포기할게요.', 'All right, I will give it up.');
    },
    name: function (p) {
      var g = p.pnr.given; p.pnr.given = g.slice(0, -1) + (g.slice(-1) === 'A' ? 'E' : 'A');
      p.say.fix = L('えっ、綴りが違っていましたか？ 直してもらえて助かります。', '어, 철자가 틀렸었나요? 고쳐 주셔서 다행이에요.', 'Oh, was the spelling wrong? Thanks for fixing it.');
      p.say.rebook = L('えっ、予約を取り直すんですか…。', '네? 예약을 다시 해야 하나요…', 'What, I have to book again…?');
    },
    pairA: function (p) {
      p.pair = { role: 'a' }; p.pnr.req = null;
      p.say.hello = L('後ろの友だちとは別々に予約したんですが、隣の席がいいです。', '뒤에 있는 친구랑 따로 예약했는데 옆자리면 좋겠어요.', 'My friend behind me booked separately, but we would like to sit together.');
      p.say.seat = L('友だちと隣同士になれる席がいいです。', '친구랑 나란히 앉을 수 있는 자리가 좋아요.', 'A seat where my friend can sit next to me, please.');
    },
    pairB: function (p) { p.pair = { role: 'b' }; p.pnr.req = null; p.say.seat = L('前の人の隣がいいです。', '앞사람 옆자리가 좋아요.', 'Next to my friend, please.'); }
  };

  var M = window.MISSION_CI02 = {
    id: 'pax.ci.02', module: 'checkin', level: 'agent', day: 2, generated: true,
    lessons: ['passenger/1-3', 'passenger/1-10', 'passenger/1-13', 'ciq/1-2'],
    date: '2026-10-11', build: build,
    variants: {
      JP: { flight: 'VELA 301', from: 'NRT', to: 'ICN', std: '10:30', start: '08:30', close: '09:30', board: '09:55', destC: 'KR', pax: function (seed) { return build('JP', seed); } },
      KR: { flight: 'VELA 302', from: 'ICN', to: 'NRT', std: '13:30', start: '11:30', close: '12:30', board: '12:55', destC: 'JP', pax: function (seed) { return build('KR', seed); } }
    },
    /* Vela 교육용 A 배치(Day 1과 같은 좌석도) — 아침편이라 더 붐빔. 옆자리 2석이 남은 블록이 여러 곳 있음 */
    aircraft: { type: 'B737-800', rows: 30, cols: 'ABCDEF', exitRows: [14, 15], inop: ['22C'],
      taken: ['1A', '1B', '1C', '1D', '2D', '2E', '2F', '3A', '3B', '4F', '4E', '5C', '5D', '6A', '6B', '6C', '7E', '7F', '8A', '8B', '9F', '9D', '10C', '10D', '11A', '11B', '12B', '12E', '12F', '13F', '13D', '16A', '16B', '16C', '17C', '17D', '18D', '18E', '19A', '19F', '20B', '20C', '21E', '21F', '23A', '23B', '24C', '24D', '25F', '25E', '26A', '26B', '27B', '27C', '28E', '28F', '29C', '29D', '30D', '30E'],
      infantSeats: ['8B'] },
    cost: { greet: 0.3, pnr: 0.5, passport: 0.6, entry: 0.5, seat: 0.5, weigh: 0.5, tag: 0.3, dg: 0.4, bp: 0.4, carry: 0.3 }
  };
  /* Day 4 이후 미션이 같은 인물·사례 데이터를 쓰도록 공개 */
  M._u = { ID: ID, CASE: CASE, person: person, shuffle: shuffle, sayPairB: sayPairB, C: C };
})();

/* mission_ci03.js */
/* 미션 pax.ci.03 「サポートが必要なお客様」(체크인편 Day 3) — 모든 승객·편·서류는 교육용 가상 데이터
   - 필수: 휠체어(D3-01)·UM(D3-02)·반려동물(D3-03) + 정상 2명 / 선택 2건: 임산부(D3-04)·가족 3명(D3-05)·유아 동반
   - 마지막: 마감 5분 뒤 도착한 승객(D3-06) — 운항 이벤트로 처리(승객 목록·PAX에는 들어가지 않음)
   - Vela 교육용 규정(합의본 v3 §7, 2026-10-11 사용자 확정): UM 5~11세 단독 필수 / PETC 케이지 포함 8kg·편당 2마리·사전 수락,
     초과 시 AVIH 조건 확인(하드 케이지), 단두종 AVIH 불가 / 임산부 단태 28주0일부터 소견서(탑승일 기준 7일 이내 발급)·36주0일부터 불가, 다태 32주0일부터 불가
   - 한 승객의 문제는 최대 2개(v2 S-2). 같은 시드 = 같은 조합 */
(function () {
  'use strict';
  var L = function (ja, ko, en) { return { ja: ja, ko: ko, en: en }; };
  var U = window.MISSION_CI02._u, A2 = window.MISSION_CI02.aircraft;
  var TODAY = '2026-10-11';

  /* 새 인물(그림 v03b)의 신원 — 국적은 서류 데이터일 뿐 */
  var NEW = {
    JP: {
      wch: { art: 'passenger_male_06_cane', photo: 'male_06', sur: 'SAITO', given: 'TAKESHI', nat: 'JPN', dob: '1952-05-20', sex: 'M', title: 'MR' },
      um: { art: 'passenger_child_01', sur: 'KIMURA', given: 'SOTA', nat: 'JPN', dob: '2018-03-15', sex: 'M', title: 'MSTR',
            guard: { sur: 'KIMURA', given: 'AKIKO', rel: L('母', '어머니', 'mother'), tel: '090-4418-2275', idDoc: L('運転免許証', '운전면허증', 'driving licence') },
            recv: { sur: 'KIMURA', given: 'DAISUKE', rel: L('父（ソウル在住）', '아버지(서울 거주)', 'father (lives in Seoul)'), tel: '+82 10-2871-4406' } },
      pet: { art: 'passenger_female_05', sur: 'OKADA', given: 'RINA', nat: 'JPN', dob: '1996-04-12', sex: 'F', title: 'MS', dog: 'MOMO' },
      preg: { art: 'passenger_female_06', sur: 'HAYASHI', given: 'EMI', nat: 'JPN', dob: '1991-02-14', sex: 'F', title: 'MRS' },
      fam: { art: 'passenger_male_07', sur: 'MATSUDA', given: 'KOJI', nat: 'JPN', dob: '1983-11-11', sex: 'M', title: 'MR',
             party: [{ art: 'passenger_female_08', role: 'mother', sur: 'MATSUDA', given: 'NAOMI', dob: '1985-05-05', sex: 'F', title: 'MRS' }, { art: 'passenger_child_02', role: 'child', sur: 'MATSUDA', given: 'HANA', dob: '2020-08-20', sex: 'F', title: 'MISS' }] },
      inf: { art: 'passenger_female_03_infant_01', photo: 'female_03', sur: 'YAMADA', given: 'SETSUKO', nat: 'JPN', dob: '1959-03-30', sex: 'F', title: 'MRS', baby: { sur: 'YAMADA', given: 'HINA', dob: '2026-03-02' } },
      late: { art: 'passenger_male_08', sur: 'ENDO', given: 'RYO', nat: 'JPN', dob: '1993-12-24', sex: 'M', title: 'MR' }
    },
    KR: {
      wch: { art: 'passenger_male_06_cane', photo: 'male_06', sur: 'CHOI', given: 'BYUNGHO', nat: 'KOR', dob: '1951-08-03', sex: 'M', title: 'MR' },
      um: { art: 'passenger_child_01', sur: 'PARK', given: 'MINJUN', nat: 'KOR', dob: '2018-06-02', sex: 'M', title: 'MSTR',
            guard: { sur: 'PARK', given: 'HYEJIN', rel: L('母', '어머니', 'mother'), tel: '010-5532-1907', idDoc: L('住民登録証', '주민등록증', 'resident registration card') },
            recv: { sur: 'PARK', given: 'JUNHO', rel: L('叔父（東京在住）', '삼촌(도쿄 거주)', 'uncle (lives in Tokyo)'), tel: '+81 90-6624-3158' } },
      pet: { art: 'passenger_female_05', sur: 'JUNG', given: 'HAEUN', nat: 'KOR', dob: '1997-11-30', sex: 'F', title: 'MS', dog: 'BORI' },
      preg: { art: 'passenger_female_06', sur: 'YOO', given: 'SEULGI', nat: 'KOR', dob: '1992-07-07', sex: 'F', title: 'MRS' },
      fam: { art: 'passenger_male_07', sur: 'SONG', given: 'DONGWOOK', nat: 'KOR', dob: '1982-10-10', sex: 'M', title: 'MR',
             party: [{ art: 'passenger_female_08', role: 'mother', sur: 'KIM', given: 'MIRAE', dob: '1984-02-21', sex: 'F', title: 'MRS' }, { art: 'passenger_child_02', role: 'child', sur: 'SONG', given: 'HAYUN', dob: '2020-04-04', sex: 'F', title: 'MISS' }] },
      inf: { art: 'passenger_female_03_infant_01', photo: 'female_03', sur: 'BAEK', given: 'YOUNGJA', nat: 'KOR', dob: '1960-10-05', sex: 'F', title: 'MRS', baby: { sur: 'KIM', given: 'SEOAH', dob: '2026-02-18' } },
      late: { art: 'passenger_male_08', sur: 'HONG', given: 'SUNGMIN', nat: 'KOR', dob: '1994-03-18', sex: 'M', title: 'MR' }
    }
  };
  /* 날짜 계산(UTC 기준 날짜만) */
  function dt(s) { var a = s.split('-'); return Date.UTC(+a[0], +a[1] - 1, +a[2]); }
  function addDays(s, n) { return new Date(dt(s) + n * 864e5).toISOString().slice(0, 10); }

  function base(d, i, country, r, V) {
    var toKR = country === 'JP';
    return { id: 'd3p' + (i + 1), art: d.art, photo: d.photo, issues: [], look: null,
      pp: { sur: d.sur, given: d.given, nat: d.nat, no: pnum(d.nat, r), dob: d.dob, sex: d.sex, exp: (2028 + Math.floor(r() * 7)) + '-0' + (1 + Math.floor(r() * 9)) + '-' + (10 + Math.floor(r() * 18)) },
      pnr: { rloc: rloc(r), sur: d.sur, given: d.given, title: d.title, cls: 'Y', ssr: [], req: null },
      ret: toKR ? 'VELA 302 ' + (16 + Math.floor(r() * 6)) + 'OCT ICNNRT' : 'VELA 301 ' + (16 + Math.floor(r() * 6)) + 'OCT NRTICN',
      bags: [{ kg: Math.round((13 + r() * 8) * 10) / 10, prop: ['prop_luggage_01', 'prop_luggage_02', 'prop_luggage_03', 'prop_duffel_01'][Math.floor(r() * 4)] }],
      carry: Math.round((3 + r() * 4) * 10) / 10, carryProp: 'prop_cabin_bag_01', dg: 'none', idMatch: true,
      say: { hello: toKR ? L('おはようございます。仁川までお願いします。', '안녕하세요. 인천까지 부탁드립니다.', 'Good morning. To Incheon, please.') : L('こんにちは。成田までお願いします。', '안녕하세요. 나리타까지 부탁드립니다.', 'Hello. To Narita, please.'),
        dg: U.C.dgNone, thanks: U.C.thanks, seatOk: U.C.seatOk, seatMeh: U.C.seatMeh, exitYes: U.C.exitYes, seat: U.C.seatAny } };
  }
  function pnum(nat, r) { var n = String(Math.floor(r() * 9000000) + 1000000); return nat === 'JPN' ? 'T' + 'RSKZ'.charAt(Math.floor(r() * 4)) + n : 'M' + n + Math.floor(r() * 10); }
  function rloc(r) { var A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', s = ''; for (var i = 0; i < 6; i++) s += A.charAt(Math.floor(r() * A.length)); return s; }

  /* 사례별 데이터 */
  var CASE = {
    /* D3-01 휠체어: 예약은 WCHR. 실제 필요한 지원은 본인에게 물어야 앎(시드: WCHR 또는 WCHS). 본인 수동 휠체어 위탁이 있을 수 있음 */
    wch: function (p, d, toKR, r, v) {
      var need = v.need;
      p.pnr.ssr = ['WCHR']; p.pnr.req = 'aisle'; p.carry = 3.2;
      p.sup = { type: 'wch', need: need, own: v.own };
      if (v.own) p.bags.push({ kg: 13.8, prop: 'prop_wheelchair_01', mob: true });
      p.say.hello = v.own ? L('杖があれば少しは歩けます。向こうで使う折りたたみの車いすも預けたいのですが。', '지팡이가 있으면 조금은 걸을 수 있어요. 가서 쓸 접이식 휠체어도 맡기고 싶은데요.', 'I can walk a little with my cane. I would also like to check in the folding wheelchair I use at the other end.') : L('杖があれば少しは歩けます。車いすをお願いしてあります。', '지팡이가 있으면 조금은 걸을 수 있어요. 휠체어를 부탁해 뒀어요.', 'I can walk a little with my cane. I asked for a wheelchair.');
      p.say.need = need === 'WCHS' ? L('階段はもう上り下りできません。機内に入れば、席までは少しなら歩けます。', '계단은 이제 오르내릴 수 없어요. 기내에 들어가면 자리까지는 조금 걸을 수 있어요.', 'I cannot manage stairs any more. Once inside the plane I can walk a short way to my seat.')
        : L('長い距離を歩くのがつらいんです。階段や機内の席までは、杖でゆっくりなら大丈夫です。', '먼 거리를 걷기가 힘들어요. 계단이나 기내 자리까지는 지팡이로 천천히 가면 괜찮아요.', 'Long distances are hard for me. Stairs and the walk to my seat are fine if I go slowly with my cane.');
      p.say.thanksSup = L('助かります。ありがとうございます。', '도움이 됩니다. 감사합니다.', 'That helps a lot. Thank you.');
      p.say.seat = L('通路側だと助かります。', '통로 쪽이면 좋겠어요.', 'An aisle seat would help.');
    },
    /* D3-02 UM 8세: 출발 보호자(어머니)가 함께 옴. 시드에 따라 신청서의 도착지 인수인 연락처가 비어 있음 */
    um: function (p, d, toKR, r, v) {
      p.pnr.ssr = ['UMNR 08']; p.pnr.req = null; p.carry = 2.4; p.bags[0].kg = Math.round((8 + r() * 4) * 10) / 10;
      p.with = [{ art: 'passenger_female_07' }];
      p.sup = { type: 'um', age: 8, guard: d.guard, recv: d.recv, blank: v.blank };
      p.say.hello = toKR ? L('（母）息子がひとりでソウルの父親のところへ行きます。サービスは予約してあります。', '(어머니) 아들이 혼자 서울에 있는 아빠한테 가요. 서비스는 예약해 뒀어요.', '(Mother) My son is flying alone to his father in Seoul. The service is booked.') : L('（母）息子がひとりで東京の叔父のところへ行きます。サービスは予約してあります。', '(어머니) 아들이 혼자 도쿄 삼촌한테 가요. 서비스는 예약해 뒀어요.', '(Mother) My son is flying alone to his uncle in Tokyo. The service is booked.');
      p.say.form = L('（母）あ、向こうの電話番号を書き忘れていました。' + d.recv.tel + 'です。', '(어머니) 아, 그쪽 전화번호를 깜빡 안 썼네요. ' + d.recv.tel + '이에요.', '(Mother) Oh, I forgot to write their number. It is ' + d.recv.tel + '.');
      p.say.stay = L('（母）はい、飛行機が出るまで空港にいます。', '(어머니) 네, 비행기가 출발할 때까지 공항에 있을게요.', '(Mother) Yes, I will stay at the airport until the plane leaves.');
      p.say.dg = L('（母）わたしが詰めました。危ない物は入っていません。', '(어머니) 제가 쌌어요. 위험한 건 없어요.', '(Mother) I packed it. There is nothing dangerous inside.');
      p.say.seat = L('（母）乗務員さんの近くだと安心です。', '(어머니) 승무원 가까이면 안심이 돼요.', '(Mother) Near the cabin crew would be reassuring.');
      p.say.umSeatMeh = L('（母）あの…乗務員さんの目が届く席ではないんですね。大丈夫でしょうか。', '(어머니) 저… 승무원 눈이 닿는 자리는 아니네요. 괜찮을까요?', '(Mother) Oh… so it is not a seat the crew can keep an eye on. Will he be all right?');   // 22차: 규정 밖 배정 때 UM 전용 반응
    },
    /* D3-03 반려동물(PETC): 시드에 따라 정상 / 8kg 초과 / 검역 서류 미비 */
    pet: function (p, d, toKR, r, v) {
      p.pnr.ssr = ['PETC 1 DOG ' + (v.kind === 'over' ? '7KG' : '6KG') + ' ACCEPTED']; p.pnr.req = 'window'; p.carry = 4.0;
      p.with = [{ prop: 'prop_pet_carrier_01' }];
      p.sup = { type: 'pet', kind: v.kind, kg: v.kind === 'over' ? 9.4 : 6.8, dog: d.dog, toKR: toKR, booked: 1 };
      p.say.hello = L('犬を機内に連れて行きます。予約のときに申し込んでいます。', '강아지를 기내에 데리고 가요. 예약할 때 신청했어요.', 'I am taking my dog in the cabin. I applied when I booked.');
      p.say.petOver = L('えっ、重すぎるんですか…？ 先月はもっと軽かったのに。', '네? 너무 무겁다고요…? 지난달엔 더 가벼웠는데.', 'What, too heavy…? She was lighter last month.');
      p.say.petDocs = toKR ? L('輸出の検査…？ 動物病院の証明書があれば大丈夫だと思っていました。', '수출 검사요…? 동물병원 증명서만 있으면 되는 줄 알았어요.', 'An export inspection…? I thought the vet\'s certificate was enough.') : L('40日前の届出…？ 知りませんでした。', '40일 전 신고요…? 몰랐어요.', 'Notice 40 days ahead…? I did not know.');
      p.say.petHold = L('…わかりました。準備し直します。', '…알겠습니다. 다시 준비할게요.', '…All right. I will get things ready again.');
      p.say.fee = L('料金はここで払うんですね。わかりました。', '요금은 여기서 내는 거군요. 알겠습니다.', 'So I pay the fee here. All right.');
      p.say.seat = L('窓側がいいです。', '창가가 좋아요.', 'Window, please.');
    },
    /* D3-04 임산부: 소견서 표시(분만 예정일·단태/다태·발급일). 주수는 플레이어가 계산 */
    preg: function (p, d, toKR, r, v) {
      /* weeks = 탑승일 기준 임신 주수(일). EDD = 탑승일 + (280 - 일수) */
      var days = v.w * 7 + v.d, edd = addDays(TODAY, 280 - days);
      p.pnr.ssr = []; p.pnr.req = 'aisle'; p.carry = 3.5;
      p.sup = { type: 'preg', kind: v.kind, multi: !!v.multi, days: days, edd: edd, cert: v.cert === null ? null : addDays(TODAY, -v.cert) };
      p.ret = toKR ? 'VELA 302 ' + (13 + Math.floor(r() * 3)) + 'OCT ICNNRT' : 'VELA 301 ' + (13 + Math.floor(r() * 3)) + 'OCT NRTICN';
      p.say.hello = toKR ? L('実家に帰ります。妊娠中なので、診断書を持ってきました。', '친정에 가요. 임신 중이라 소견서를 가져왔어요.', 'I am going to my parents\'. I am pregnant, so I brought a medical certificate.') : L('夫のところに戻ります。妊娠中なので、診断書を持ってきました。', '남편한테 돌아가요. 임신 중이라 소견서를 가져왔어요.', 'I am going back to my husband. I am pregnant, so I brought a medical certificate.');
      if (v.cert === null) p.say.hello = L('ソウルの友だちに会いに行きます。妊娠中ですが、体調はいいです。', '서울 친구 만나러 가요. 임신 중인데 컨디션은 좋아요.', 'I am visiting a friend. I am pregnant, but I feel fine.');
      if (v.cert === null && !toKR) p.say.hello = L('東京の友だちに会いに行きます。妊娠中ですが、体調はいいです。', '도쿄 친구 만나러 가요. 임신 중인데 컨디션은 좋아요.', 'I am visiting a friend in Tokyo. I am pregnant, but I feel fine.');
      p.say.pregNo = L('…そうですか。わかりました。主治医と相談します。', '…그렇군요. 알겠습니다. 주치의와 상담할게요.', '…I see. I understand. I will talk to my doctor.');
      p.say.pregHold = L('日付が古かったんですね…。新しい診断書をもらってきます。', '날짜가 지났었군요…. 새 소견서를 받아 올게요.', 'So the date was too old… I will get a new certificate.');
      p.say.pregOver = L('えっ、乗れないんですか？ 先生は大丈夫だって…。', '네? 못 탄다고요? 선생님은 괜찮다고 했는데….', 'What, I cannot fly? My doctor said it was fine…');
      p.say.seat = L('通路側だとありがたいです。', '통로 쪽이면 고맙겠어요.', 'An aisle seat would be kind.');
    },
    /* D3-05 가족 3명(같은 예약): 아이를 보호자 옆에 */
    fam: function (p, d, toKR, r) {
      p.pnr.req = null; p.carry = 6.0; p.bags = [{ kg: Math.round((18 + r() * 4) * 10) / 10, prop: 'prop_luggage_01' }, { kg: Math.round((14 + r() * 4) * 10) / 10, prop: 'prop_luggage_02' }];
      p.with = [{ art: 'passenger_female_08' }, { art: 'passenger_child_02' }];
      p.party = d.party.map(function (m) { return { art: m.art, role: m.role, sur: m.sur, given: m.given, dob: m.dob, sex: m.sex, title: m.title, nat: d.nat, no: pnum(d.nat, r), exp: (2029 + Math.floor(r() * 6)) + '-0' + (1 + Math.floor(r() * 9)) + '-' + (10 + Math.floor(r() * 18)), photo: m.art.replace('passenger_', '') }; });
      p.pnr.party = p.party.map(function (m) { return m.sur + '/' + m.given + ' ' + m.title + (m.role === 'child' ? ' (CHD 06)' : ''); });
      p.sup = { type: 'fam' };
      p.say.hello = toKR ? L('家族3人でソウル旅行です。娘と並んで座りたいんですが。', '가족 셋이 서울 여행 가요. 딸이랑 나란히 앉고 싶은데요.', 'The three of us are off to Seoul. We would like to sit with our daughter.') : L('家族3人で東京旅行です。娘と並んで座りたいんですが。', '가족 셋이 도쿄 여행 가요. 딸이랑 나란히 앉고 싶은데요.', 'The three of us are off to Tokyo. We would like to sit with our daughter.');
      p.say.seat = L('3人並びが無理なら、娘の隣にどちらか一人がいれば大丈夫です。', '셋이 나란히가 어려우면 딸 옆에 둘 중 한 명만 있어도 괜찮아요.', 'If three together is not possible, one of us next to our daughter is fine.');
      p.say.dg = L('2つとも自分たちで詰めました。危ない物はありません。', '둘 다 저희가 쌌어요. 위험한 건 없어요.', 'We packed both ourselves. Nothing dangerous.');
    },
    /* 유아 동반(Day 1 유형 복습): 비상구 불가·같은 열 블록 겹침 금지, 접은 유모차는 무료 */
    inf: function (p, d, toKR) {
      p.inf = { sur: d.baby.sur, given: d.baby.given, dob: d.baby.dob, exp: '2031-0' + (2 + (d.baby.dob.charCodeAt(9) % 7)) + '-15', photo: 'infant_01' };
      p.pnr.ssr = ['INFT ' + d.baby.sur + '/' + d.baby.given + ' ' + d.baby.dob.slice(8) + ['JAN', 'FEB', 'MAR'][+d.baby.dob.slice(5, 7) - 1] + d.baby.dob.slice(2, 4)]; p.pnr.req = 'aisle';
      p.issues = ['infant']; p.bags.push({ kg: 6.2, stroller: true, prop: 'prop_stroller_folded_01' });
      p.say.hello = L('孫と一緒です。ベビーカーは預けられますか？', '손주랑 같이 왔어요. 유모차는 맡길 수 있나요?', 'I am travelling with my grandchild. Can I check the stroller?');
      p.say.seat = L('通路側の前のほうがいいです。', '앞쪽 통로 자리가 좋아요.', 'Near the front on the aisle, please.');
    }
  };

  function build(country, seed) {
    var r = window.SAGA_DAYS.rng(seed), V = M.variants[country], toKR = country === 'JP', N = NEW[country];
    /* 선택 2건: 임산부·가족·유아 중 2가지 */
    var opt = U.shuffle(['preg', 'fam', 'inf'], r).slice(0, 2);
    var types = ['wch', 'um', 'pet'].concat(opt);
    var pregV = [{ kind: 'ok', w: 33, d: 2, cert: 3 }, { kind: 'stale', w: 33, d: 4, cert: 10 }, { kind: 'over', w: 36, d: 2, cert: 2 }, { kind: 'multi', w: 32, d: 1, cert: 2, multi: true }, { kind: 'early', w: 25, d: 3, cert: null }][Math.floor(r() * 5)];
    var V3 = { wch: { need: r() < .5 ? 'WCHR' : 'WCHS', own: r() < .5 }, um: { blank: r() < .5 }, pet: { kind: ['ok', 'ok', 'over', 'docs'][Math.floor(r() * 4)] }, preg: pregV };
    /* 정상 승객 2명: Day 2 인물에서(새 그림 인물과 겹치지 않게) */
    var pool = U.shuffle(Object.keys(U.ID[country]).filter(function (a) { return a !== 'passenger_female_03' && a !== 'passenger_male_10'; }), r);
    var slots = types.map(function (t) { return { t: t }; });
    slots.push({ t: 'n', art: pool[0] }); slots.push({ t: 'n', art: pool[1] });
    /* 순서: 첫 승객은 정상(감 잡기), 나머지는 섞음 */
    var first = slots.splice(5, 1)[0];
    slots = [first].concat(U.shuffle(slots, r));
    var list = slots.map(function (s, i) {
      if (s.t === 'n') { var p0 = U.person({ cases: [], art: s.art }, i, country, r, V); p0.id = 'd3p' + (i + 1); return p0; }
      var d = N[s.t], p = base(d, i, country, r, V);
      CASE[s.t](p, d, toKR, r, V3[s.t] || {});
      return p;
    });
    list.seed = seed; list.cases = types.concat(['late']); list.variants = { wch: V3.wch, um: V3.um, pet: V3.pet.kind, preg: opt.indexOf('preg') >= 0 ? pregV.kind : null };
    list.late = base(N.late, 8, country, r, V); list.late.id = 'd3late';
    return list;
  }

  var M = window.MISSION_CI03 = {
    id: 'pax.ci.03', module: 'checkin', level: 'agent', day: 3, generated: true,
    lessons: ['passenger/1-6', 'passenger/1-7', 'passenger/1-8', 'passenger/1-5'], date: TODAY, build: build,
    variants: {
      JP: { flight: 'VELA 301', from: 'NRT', to: 'ICN', std: '10:30', etdLate: '10:45', start: '08:25', close: '09:30', board: '09:55', destC: 'KR',
        alt: [{ flight: 'VELA 303', dep: '15:30' }, { flight: 'VELA 305', dep: '19:10' }], pax: function (seed) { return build('JP', seed); } },
      KR: { flight: 'VELA 302', from: 'ICN', to: 'NRT', std: '13:30', etdLate: '13:45', start: '11:25', close: '12:30', board: '12:55', destC: 'JP',
        alt: [{ flight: 'VELA 304', dep: '18:30' }, { flight: 'VELA 306', dep: '21:05' }], pax: function (seed) { return build('KR', seed); } }
    },
    /* Vela 교육용 A 배치(Day 2와 같음) */
    aircraft: A2,
    /* Vela Air 교육용 규정(화면에 「Vela Air 教育用規定」으로 표시) */
    rules: {
      umSeats: ['1C', '1D', '2C', '2D', '3C', '3D', '4C', '4D', '5C', '5D', '6C', '6D'],   // 22차 사용자 확정(안 A): 1~6열 C·D 12석(Vela 교육용 규정)
      petcMaxKg: 8, petcPerFlight: 2,
      petFee: { JP: { amt: 6000, cur: 'JPY' }, KR: { amt: 60000, cur: 'KRW' } },
      pregCertFrom: 28 * 7, pregNoFrom: 36 * 7, pregMultiNoFrom: 32 * 7, certValidDays: 7
    },
    events: { lateAtEnd: true },
    cost: { greet: 0.3, pnr: 0.5, passport: 0.6, entry: 0.5, seat: 0.5, weigh: 0.5, tag: 0.3, dg: 0.4, bp: 0.4, carry: 0.3 }
  };
})();

/* mission_ci04.js */
/* 미션 pax.ci.04 「イレギュラー①」(체크인편 Day 4) — 교육용 가상 데이터
   - 이벤트 E4-01: 4번째 승객 처리 후 기재 변경(Vela 교육용 A 배치 → B 배치, 예약 인원은 모두 들어감 — 합의본 v3 A-1)
   - 이벤트 E4-02: 6번째 승객 응대 중 DCS 장애 → 수기 체크인(6·7번째) → 복구 후 대조
   - 처음 4명은 이벤트에서 확인할 상황을 만들기 위해 역할이 고정: 일반 성인 / 유아 동반 / 따로 예약한 일행 2명 */
(function () {
  'use strict';
  var L = function (ja, ko, en) { return { ja: ja, ko: ko, en: en }; };
  var U = window.MISSION_CI02._u, A2 = window.MISSION_CI02.aircraft;
  var LAYOUT_A = { id: 'A', rows: 30, cols: 'ABCDEF', exitRows: [14, 15], inop: ['22C'], taken: A2.taken.slice(), infantSeats: ['8B'],
    nm: L('Vela 教育用 A配置（30列・180席）', 'Vela 교육용 A 배치(30열·180석)', 'Vela training layout A (30 rows, 180 seats)') };
  /* B 배치: 26열·156석, 비상구는 12열 1열. 다른 승객(온라인 체크인 등)은 DCS가 자동으로 옮긴 결과 */
  var RESERVE = ['12A', '12B', '12C', '12D', '12E', '12F', '8C', '20A', '20B', '23F', '23E'];
  var LAYOUT_B = { id: 'B', rows: 26, cols: 'ABCDEF', exitRows: [12], inop: [], infantSeats: ['8B'],
    taken: A2.taken.filter(function (s) { return parseInt(s, 10) <= 26 && RESERVE.indexOf(s) < 0; }).concat(['23E']),
    nm: L('Vela 教育用 B配置（26列・156席）', 'Vela 교육용 B 배치(26열·156석)', 'Vela training layout B (26 rows, 156 seats)') };
  /* 기재 변경 때 DCS가 자동으로 정한 새 좌석(처음 4명). 직원이 예외를 찾아 고쳐야 함 */
  var AUTO = { adult: '12C', infant: '8C', pairA: '20A', pairB: '23F' };

  var CLAIM_SAY = {
    dcsWait: { open: L('ずいぶん待ちましたよ。システムが止まっているって、手書きの搭乗券で本当に乗れるんですか？', '꽤 기다렸어요. 시스템이 멈췄다던데, 손으로 쓴 탑승권으로 정말 탈 수 있는 거예요?', 'I have been waiting for ages. The system is down? Can I really board with a handwritten boarding pass?'),
      ok: L('そうですか。それなら安心しました。', '그렇군요. 그럼 안심이에요.', 'I see. That is a relief.') },
    seatChanged: { open: L('ネットで窓側の席を選んでおいたのに、機材変更で変わったって通知が来ました。どういうことですか？', '인터넷으로 창가 자리를 골라 뒀는데 기재 변경으로 바뀌었다는 알림이 왔어요. 어떻게 된 거예요?', 'I picked a window seat online, but I got a notice it changed because of an aircraft change. What happened?'),
      ok: L('そうでしたか。窓側があればお願いします。', '그랬군요. 창가 자리가 있으면 부탁해요.', 'I see. A window seat if there is one, please.') }
  };
  function build(country, seed) {
    var r = window.SAGA_DAYS.rng(seed), toKR = country === 'JP';
    /* 27차(사용자 10-14): 클레임 승객은 그림(=목소리)을 고정 — DCS 대기 항의 male_04, 좌석 변경 항의 female_02 */
    var CL = { dcsWait: 'passenger_male_04', seatChanged: 'passenger_female_02' };
    var arts = U.shuffle(Object.keys(U.ID.JP).filter(function (a) { return a !== 'passenger_male_10' && a !== CL.dcsWait && a !== CL.seatChanged; }), r);
    var fem = arts.filter(function (a) { return /female/.test(a); });
    var infArt = fem[0]; arts.splice(arts.indexOf(infArt), 1);
    var V = M.variants[country];
    /* 27차: 처음 4명(기재 변경 대상)은 순서를 섞음(일행은 붙여서) */
    var head = U.shuffle([[{ cases: [], role: 'adult' }], [{ cases: ['infant'], role: 'infant' }], [{ cases: ['pairA'], role: 'pairA' }, { cases: ['pairB'], role: 'pairB' }]], r), roles = [];
    head.forEach(function (b) { b.forEach(function (s) { s.art = s.role === 'infant' ? infArt : arts.shift(); roles.push(s); }); });
    roles.push({ cases: [], art: arts.shift() });   /* 28차(사용자 요청 1/3 · GPT 27차 의견): 개별 문제 없는 일반 승객 3/8(일반·수기 1·이 승객). 예전의 추가 문제 1명을 일반으로 */
    roles.push({ cases: [], art: arts.shift(), role: 'manual1' });
    roles.push({ cases: [], art: CL.dcsWait, role: 'manual2', claim: 'dcsWait' });   /* 수기 체크인 중 대기·수기 탑승권 항의 */
    roles.push({ cases: [], art: CL.seatChanged, role: 'seatChanged', claim: 'seatChanged' });   /* 기재 변경으로 온라인 지정 창가석이 바뀐 항의 */
    var list = roles.map(function (s, i) {
      var p = U.person(s, i, country, r, V); p.id = 'd4p' + (i + 1); p.role = s.role || null;
      if (s.role === 'adult') { p.pnr.req = 'aisle'; p.say.seat = U.C.seatAisle; p.dob18 = true; }
      if (s.role === 'infant') {
        p.inf = { sur: p.pp.sur, given: toKR ? 'SORA' : 'HARU', dob: '2025-11-03', no: p.pp.no.slice(0, -2) + '77', exp: '2030-11-02' };
        p.pnr.ssr = ['INFT ' + p.inf.sur + '/' + p.inf.given + ' 03NOV25']; p.pnr.req = 'aisle';
        p.say.hello = L('赤ちゃんと一緒です。通路側がいいです。', '아기와 함께예요. 통로 쪽이 좋아요.', 'I am travelling with my baby. An aisle seat, please.');
        p.say.seat = U.C.seatAisle;
      }
      p.auto = AUTO[s.role] || null;
      if (s.claim) { p.claim = s.claim; p.say.claim = CLAIM_SAY[s.claim].open; p.say.claimOk = CLAIM_SAY[s.claim].ok; if (s.claim === 'seatChanged') { p.pnr.req = 'window'; p.say.seat = U.C.seatWin; } }
      return p;
    });
    var a = list.filter(function (p) { return p.role === 'pairA'; })[0], b = list.filter(function (p) { return p.role === 'pairB'; })[0];   /* 27차: 순서를 섞으므로 역할로 찾음 */
    a.pair.mate = b.id; b.pair.mate = a.id; b.say.hello = U.sayPairB(a);
    b.pnr.remark = 'TCP ' + a.pnr.rloc + ' ' + a.pp.sur + '/' + a.pp.given; a.pnr.remark = 'TCP ' + b.pnr.rloc + ' ' + b.pp.sur + '/' + b.pp.given;
    list.seed = seed;
    return list;
  }

  var M = window.MISSION_CI04 = {
    id: 'pax.ci.04', module: 'checkin', level: 'agent', day: 4, generated: true,
    lessons: ['passenger/1-5', 'passenger/1-3'], date: '2026-10-11', build: build,
    variants: {
      JP: { flight: 'VELA 301', from: 'NRT', to: 'ICN', std: '10:30', start: '08:10', close: '09:30', board: '09:55', destC: 'KR', pax: function (seed) { return build('JP', seed); } },
      KR: { flight: 'VELA 302', from: 'ICN', to: 'NRT', std: '13:30', start: '11:10', close: '12:30', board: '12:55', destC: 'JP', pax: function (seed) { return build('KR', seed); } }
    },
    aircraft: LAYOUT_A, layoutB: LAYOUT_B, auto: AUTO,
    events: { swapAfter: 4, dcsAt: 5, recoverAfter: 7 },
    cost: { greet: 0.3, pnr: 0.5, passport: 0.6, entry: 0.5, seat: 0.5, weigh: 0.5, tag: 0.3, dg: 0.4, bp: 0.4, carry: 0.3 }
  };
})();

/* mission_ci05.js */
/* 미션 pax.ci.05 「イレギュラー②」(체크인편 Day 5) — 교육용 가상 데이터
   - E5-01: 시작 직후 지연(ETD +120분, 회사 사유 — 도착 기재 지연). 모든 승객에게 지연 안내·식사 쿠폰(Vela 교육용: 120분 이상)
            연결편 승객은 지연 후 도착 예정으로 연결 시간을 다시 계산해 MCT와 비교
   - E5-03: 연결이 불가능해진 승객의 항의(사과 → 확인된 사실 → 선택지 → 권한 밖은 SV)
   - E5-02: 5번째 승객 처리 후 운항 정보 — 예약 초과. SV 확인 → 자원자에게 조건 설명·동의 → 대체편
   - 처음 5명과 뒤 4명(자원자 후보)은 역할이 고정. 일본·한국은 시차가 없음(JST = KST) */
(function () {
  'use strict';
  var L = function (ja, ko, en) { return { ja: ja, ko: ko, en: en }; };
  var U = window.MISSION_CI02._u, A2 = window.MISSION_CI02.aircraft;

  /* 연결편(교육용 가상 편명). cnx = 원래 연결 시간, 지연 후 연결 시간은 게임이 dep − eta 로 계산 */
  var CONN = {
    JP: { ok: { flight: 'ORN 088', from: 'ICN', to: 'HNL', dep: '15:55', arr: '08:20', mct: 60 },
          ng: { flight: 'ORN 086', from: 'ICN', to: 'HNL', dep: '15:20', arr: '07:45', mct: 60 },
          alt: { flight: 'ORN 090', from: 'ICN', to: 'HNL', dep: '21:30', arr: '13:55' } },
    KR: { ok: { flight: 'ORN 052', from: 'NRT', to: 'HNL', dep: '19:05', arr: '07:40', mct: 60 },
          ng: { flight: 'ORN 050', from: 'NRT', to: 'HNL', dep: '18:25', arr: '07:00', mct: 60 },
          alt: { flight: 'ORN 054', from: 'NRT', to: 'HNL', dep: '21:40', arr: '10:15' } }
  };
  function pm(s) { var p = s.split(':'); return +p[0] * 60 + +p[1]; }

  var SAY = {
    angry: L('2時間も遅れるって、どういうことですか？ 仁川で乗り継ぎがあるんですよ！', '2시간이나 늦는다니 어떻게 된 거예요? 인천에서 갈아타야 한다고요!', 'Two hours late? What is going on? I have a connection in Incheon!'),
    angryKR: L('2時間も遅れるって、どういうことですか？ 成田で乗り継ぎがあるんですよ！', '2시간이나 늦는다니 어떻게 된 거예요? 나리타에서 갈아타야 한다고요!', 'Two hours late? What is going on? I have a connection in Narita!'),
    comp: L('それで、補償はどうなるんですか？', '그래서 보상은 어떻게 되는 거예요?', 'So what compensation do I get?'),
    calmed: L('…わかりました。早めに確認してください。', '…알겠습니다. 빨리 확인해 주세요.', '…All right. Please check quickly.'),
    rebookOk: L('夜の便ですね…仕方ないです。それでお願いします。', '밤 비행기네요… 어쩔 수 없죠. 그걸로 부탁해요.', 'The evening flight… nothing for it. Please do that.'),
    flexYes: L('急ぎではないので、後の便でも大丈夫ですよ。', '급하지 않으니까 다음 비행기도 괜찮아요.', 'I am not in a hurry, so a later flight is fine.'),
    busyNo: L('すみません、今日は夕方に大事な約束があって…。', '죄송해요, 오늘 저녁에 중요한 약속이 있어서요….', 'Sorry, I have an important appointment this evening….'),
    pairNo: L('友だちと一緒なので、別々になるのは困ります…。', '친구랑 같이 가서 따로 가는 건 곤란해요….', 'I am travelling with my friend, so splitting up would be difficult….'),
    volHello: L('さきほどの便の変更の件ですね。よろしくお願いします。', '아까 비행기 변경 건이죠. 잘 부탁드립니다.', 'This is about the flight change, right? Thank you.'),
    volUpset: L('えっ、わたしが別の便に？ そんな話、聞いていませんよ…。', '네? 제가 다른 비행기로요? 그런 얘기 못 들었는데요….', 'What, me on another flight? Nobody asked me….'),
    lounge: L('2時間も遅れるんですよね。待つあいだ、ラウンジを使わせてもらえませんか？', '2시간이나 늦어지는 거죠? 기다리는 동안 라운지를 쓰게 해 주실 수 없나요?', 'It is two hours late, right? Could I use the lounge while I wait?'),
    loungeOk: L('わかりました。食事券で待つことにします。', '알겠습니다. 식사 쿠폰으로 기다릴게요.', 'All right. I will wait with the meal voucher.'),
    delayHeard: L('遅れるんですね。わかりました。', '늦어지는군요. 알겠습니다.', 'It is delayed, then. Understood.')
  };

  function build(country, seed) {
    var r = window.SAGA_DAYS.rng(seed), V = M.variants[country], toKR = country === 'JP', CN = CONN[country];
    var arts = U.shuffle(Object.keys(U.ID.JP).filter(function (a) { return a !== 'passenger_male_03' && a !== 'passenger_female_04' && a !== 'passenger_male_02'; }), r);   /* 27차: male_02 = 라운지 요구 클레임 승객(그림·목소리 고정) */
    var extras = U.shuffle(['battery', 'overweight', 'name', 'shortValid', 'golf'], r).slice(0, 1);   /* 28차: 일반 승객 3/9(n2·flex·busy) — 추가 문제는 1명 */
    function art(c) { if (c === 'golf' && arts.indexOf('passenger_male_05') >= 0) { arts.splice(arts.indexOf('passenger_male_05'), 1); return 'passenger_male_05'; } return arts.shift(); }
    var head = [
      { cases: [extras[0]], art: art(extras[0]), role: 'n1' },
      { cases: ['through'], art: 'passenger_female_04', role: 'connOK' },
      { cases: [], art: arts.shift(), role: 'n2' },
      { cases: ['through'], art: 'passenger_male_03', role: 'connNG' },
      { cases: [], art: 'passenger_male_02', role: 'n3', claim: 'lounge' }
    ];
    /* 자원자 후보(대기열): 일행 2명 / 일정 여유 있는 1명 / 오늘 약속이 있는 1명 — 순서는 시드로 섞음(일행은 붙여서) */
    var blocks = U.shuffle([[{ cases: ['pairA'], role: 'pairA' }, { cases: ['pairB'], role: 'pairB' }], [{ cases: [], role: 'flex' }], [{ cases: [], role: 'busy' }]], r);
    var tail = []; blocks.forEach(function (b) { b.forEach(function (s) { s.art = arts.shift(); tail.push(s); }); });
    var list = head.concat(tail).map(function (s, i) {
      var p = U.person(s, i, country, r, V); p.id = 'd5p' + (i + 1); p.role = s.role;
      if (s.role === 'connOK' || s.role === 'connNG') {
        var c0 = s.role === 'connOK' ? CN.ok : CN.ng;
        p.conn = { flight: c0.flight, from: c0.from, to: c0.to, dep: c0.dep, arr: c0.arr, mct: c0.mct, cnx: pm(c0.dep) - pm(V.sta), esta: 'approved' };
      }
      if (s.role === 'connNG') {
        p.alt = CN.alt; p.complain = true;
        p.say.hello = toKR ? SAY.angry : SAY.angryKR; p.say.comp = SAY.comp; p.say.calmed = SAY.calmed; p.say.rebookOk = SAY.rebookOk;
      }
      if (s.claim) { p.claim = s.claim; p.say.claim = SAY.lounge; p.say.claimOk = SAY.loungeOk; }
      if (s.role === 'flex') { p.say.ask = SAY.flexYes; p.willVol = true; }
      if (s.role === 'busy') p.say.ask = SAY.busyNo;
      if (s.role === 'pairA' || s.role === 'pairB') p.say.ask = SAY.pairNo;
      p.say.volHello = SAY.volHello; p.say.volUpset = SAY.volUpset; p.say.delay = SAY.delayHeard;
      return p;
    });
    var a = list.filter(function (p) { return p.role === 'pairA'; })[0], b = list.filter(function (p) { return p.role === 'pairB'; })[0];
    a.pair.mate = b.id; b.pair.mate = a.id; b.pair.mateName = a.pp.sur + ' ' + a.pp.given; b.say.hello = U.sayPairB(a);
    b.pnr.remark = 'TCP ' + a.pnr.rloc + ' ' + a.pp.sur + '/' + a.pp.given; a.pnr.remark = 'TCP ' + b.pnr.rloc + ' ' + b.pp.sur + '/' + b.pp.given;
    list.seed = seed; list.cases = extras;
    return list;
  }

  var M = window.MISSION_CI05 = {
    id: 'pax.ci.05', module: 'checkin', level: 'agent', day: 5, generated: true,
    lessons: ['passenger/1-5', 'passenger/1-3'], date: '2026-10-11', build: build,
    variants: {
      JP: { flight: 'VELA 301', from: 'NRT', to: 'ICN', std: '10:30', etd: '12:30', sta: '12:55', eta: '14:55', start: '08:05', close: '09:30', board: '09:55', boardNew: '11:55', destC: 'KR',
        alt: { flight: 'VELA 303', dep: '15:30', board: '14:55', seat: '18C' }, pax: function (seed) { return build('JP', seed); } },
      KR: { flight: 'VELA 302', from: 'ICN', to: 'NRT', std: '13:30', etd: '15:30', sta: '15:55', eta: '17:55', start: '11:05', close: '12:30', board: '12:55', boardNew: '14:55', destC: 'JP',
        alt: { flight: 'VELA 304', dep: '18:30', board: '17:55', seat: '18C' }, pax: function (seed) { return build('KR', seed); } }
    },
    /* Vela 교육용 A 배치(Day 2와 같음). 예약 초과 수치: 판매 182 / 좌석 180 */
    aircraft: A2, sold: 182, seats: 180,
    delayMin: 120, voucherMin: 120,
    events: { delayAtStart: true, overbookAfter: 5 },
    cost: { greet: 0.3, pnr: 0.5, passport: 0.6, entry: 0.5, seat: 0.5, weigh: 0.5, tag: 0.3, dg: 0.4, bp: 0.4, carry: 0.3 }
  };
})();

/* days.js */
/* AIRLINE SAGA — 체크인편 「カウンターの5日間」 근무일 목록 · 학습 이력 · 난수
   - 근무일마다 미션 데이터(variants·aircraft·cost)를 연결. 준비 중인 날은 mission: null
   - 학습 이력 키: 'ci.d{n}.{JP|KR}' (언어와 무관) */
(function () {
  'use strict';
  var L = function (ja, ko, en) { return { ja: ja, ko: ko, en: en }; };

  var DAYS = [
    { n: 1, id: 'ci.d1', mission: window.MISSION_CI01, hints: true,
      nm: L('初出勤', '첫 근무', 'First shift'),
      learn: L('チェックインの基本手順', '체크인 기본 절차', 'The basic check-in steps') },
    { n: 2, id: 'ci.d2', mission: window.MISSION_CI02,
      nm: L('忙しい朝', '바쁜 아침', 'Busy morning'),
      learn: L('旅券の深掘り・乗り継ぎ・特殊な手荷物', '여권 심화·환승·특수 수하물', 'Passports in depth, connections, special bags') },
    { n: 3, id: 'ci.d3', mission: window.MISSION_CI03,
      nm: L('サポートが必要なお客様', '도움이 필요한 승객', 'Passengers who need help'),
      learn: L('車いす・お一人で旅するお子様・ペット・妊娠中の方', '휠체어·혼자 여행하는 어린이·반려동물·임산부', 'Wheelchairs, children travelling alone, pets, pregnancy') },
    { n: 4, id: 'ci.d4', mission: window.MISSION_CI04,
      nm: L('イレギュラー①', '비정상 ①', 'Irregular ops 1'),
      learn: L('機材変更・システム障害（手作業チェックイン）', '기재 변경·시스템 장애(수기 체크인)', 'Aircraft change, system outage (manual check-in)') },
    { n: 5, id: 'ci.d5', mission: window.MISSION_CI05,
      nm: L('イレギュラー②', '비정상 ②', 'Irregular ops 2'),
      learn: L('遅延・乗り継ぎ不可・オーバーブッキング', '지연·환승 불가·오버부킹', 'Delays, missed connections, overbooking') }
  ];

  /* 열리는 조건(안): 앞의 날을 B 이상 + 안전 합격으로 마침. 준비 중인 날은 항상 잠김 */
  var RANKV = { S: 4, A: 3, B: 2, C: 1 };
  function key(day, country) { return day.id + '.' + country; }
  function rec(hist, day, country) { return (hist || {})[key(day, country)] || null; }
  /* 해금 근거: 같은 회차 안에서 B 이상 + 안전 합격 + 모든 승객 처리(bestClear). 예전 점수(legacyBest)는 근거가 아님 */
  function cleared(r) { return !!(r && r.bestClear && RANKV[r.bestClear] >= RANKV.B); }
  function status(hist, n, country, practice) {
    var d = DAYS[n - 1];
    if (!d.mission) return 'soon';
    if (n === 1 || practice) return 'open';
    return cleared(rec(hist, DAYS[n - 2], country)) ? 'open' : 'lock';
  }

  /* 결과 기록: 한 판에 한 번. miss = 이번 판에서 놓친 항목 코드 목록 */
  /* 최고 성적(INT-F03): 모든 승객 처리 → 안전 합격 → 등급 → 점수 순으로 고름. 한 회차의 등급·점수·안전·업무·힌트를 함께 둠(다른 회차끼리 합치지 않음) */
  function better(a, b) { if (!b) return true; if (!!a.complete !== !!b.complete) return !!a.complete; if (!!a.safe !== !!b.safe) return !!a.safe; var ra = RANKV[a.rank] || 0, rb = RANKV[b.rank] || 0; return ra !== rb ? ra > rb : a.tot > b.tot; }
  function record(hist, day, country, run) {
    var k = key(day, country) + (run.practice ? '.practice' : ''), r = hist[k] || { plays: 0, best: 0, bestRank: null, bestSafeRank: null, bestClear: null, safeEver: false, miss: {} };
    /* 회차를 알 수 없는 예전 집계는 따로 보관(지우지 않음, 같은 회차로 추정하지 않음) */
    if (!r.top && r.plays > 0 && !r.legacyAgg) r.legacyAgg = { bestRank: r.bestRank, best: r.best, safeEver: !!r.safeEver };
    /* 25차(GPT 의견): 채점 방식 버전. Day 1은 25차부터 Day 2 이후와 같은 7항목(full7), 그 전 Day 1은 3항목(basic3).
       다른 버전의 최고 기록은 지우지 않고 prevTop[버전]으로 옮겨 보관·표시(새 버전끼리만 비교). 해금 근거(bestClear)는 그대로 둠 */
    var ver = run.scoreVer || 'full7', oldVer = day.n === 1 ? 'basic3' : 'full7';
    if (r.top && (r.top.scoreVer || oldVer) !== ver) { var pv = r.top.scoreVer || oldVer; r.prevTop = r.prevTop || {}; if (!r.prevTop[pv] || better(r.top, r.prevTop[pv])) r.prevTop[pv] = Object.assign({}, r.top, { scoreVer: pv }); r.top = null; }
    var cur = { rank: run.rank, tot: run.tot, safe: !!run.safe, ops: run.ops !== false, hints: !!run.hints, complete: !!run.complete, at: run.at, scoreVer: ver };
    if (better(cur, r.top)) r.top = cur;
    r.plays++;
    if (run.tot > r.best) r.best = run.tot;
    if (!r.bestRank || RANKV[run.rank] > RANKV[r.bestRank]) r.bestRank = run.rank;
    if (run.safe) { r.safeEver = true; if (!r.bestSafeRank || RANKV[run.rank] > RANKV[r.bestSafeRank]) r.bestSafeRank = run.rank; }
    if (run.safe && run.complete && (!r.bestClear || RANKV[run.rank] > RANKV[r.bestClear])) r.bestClear = run.rank;
    (run.miss || []).forEach(function (c) { r.miss[c] = (r.miss[c] || 0) + 1; });
    r.last = { rank: run.rank, tot: run.tot, safe: run.safe, at: run.at, scoreVer: ver };
    hist[k] = r;
    return r;
  }
  function topMiss(r, n) {
    if (!r || !r.miss) return [];
    return Object.keys(r.miss).sort(function (a, b) { return r.miss[b] - r.miss[a]; }).slice(0, n || 3).map(function (c) { return { code: c, count: r.miss[c] }; });
  }

  /* 같은 날을 다시 해도 다른 조합이 나오게 하는 난수(시드 고정 가능 — 시험·재현용) */
  function rng(seed) {
    var a = (seed >>> 0) || 1;
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }

  /* 저장: 새 키 acn-saga-hist-v2 (schemaVersion 2). 예전 acn-saga-v1은 지우지 않고, Day 1 예전 최고 점수만 legacyBest로 표시(안전 여부 unknown) */
  var HKEY = 'acn-saga-hist-v2';
  function loadStore() {
    var st = null;
    try { st = JSON.parse(localStorage.getItem(HKEY) || 'null'); } catch (e) {}
    if (!st || st.schemaVersion !== 2) {
      st = { schemaVersion: 2, days: {}, attempts: [] };
      try { var old = JSON.parse(localStorage.getItem('acn-saga-v1') || '{}'); ['JP', 'KR'].forEach(function (c) { var b = old.best && old.best['pax.ci.01.' + c]; if (b) st.days['ci.d1.' + c] = { plays: 0, best: 0, bestRank: null, bestSafeRank: null, bestClear: null, safeEver: false, miss: {}, legacyBest: b, legacySafety: 'unknown' }; }); } catch (e) {}
    }
    /* 최고 성적 회차가 없는 예전 집계: 최근 시도(최대 20회) 중 등급·점수가 모두 같은 회차가 있을 때만 그 회차로 복원. 없으면 legacy로 둠 */
    Object.keys(st.days || {}).forEach(function (k) {
      var r = st.days[k], m = /^ci\.d(\d)\.(JP|KR)(\.practice)?$/.exec(k);
      if (!r || r.top || !r.plays || !m) return;
      var a = (st.attempts || []).filter(function (x) { return x.day === +m[1] && x.workplace === m[2] && (x.mode === 'practice') === !!m[3] && x.rank === r.bestRank && x.score === r.best; })[0];
      if (a) { r.top = { rank: a.rank, tot: a.score, safe: !!a.safetyPassed, ops: a.opsPassed !== false, hints: !!a.hintsUsed, complete: a.complete !== false, at: (a.completedAt || '').slice(0, 10) }; r.topFrom = 'attempt'; }
    });
    /* 이전 schemaVersion 2 기록의 오답에 이유·행동·심각도가 없으면 unknown으로 읽음(지우지 않음) */
    (st.attempts || []).forEach(function (a) { (a.mistakes || []).forEach(function (m) { if (!m.reasonKey) m.reasonKey = 'unknown'; if (!m.action) m.action = 'unknown'; if (!m.severity) m.severity = 'unknown'; }); });
    /* 예전 기록에 같은 승객·같은 코드의 critical과 self-corrected가 함께 있으면 critical 우선으로 읽음(원본은 그대로 두고 표시만) */
    (st.attempts || []).forEach(function (a) { var crit = {}; (a.mistakes || []).forEach(function (m) { if (m.severity === 'critical') crit[(m.paxId || '') + '|' + m.caseCode] = true; }); (a.mistakes || []).forEach(function (m) { if (m.severity === 'self-corrected' && crit[(m.paxId || '') + '|' + m.caseCode]) m.readAs = 'superseded-by-critical'; }); });
    return st;
  }
  function saveStore(st) { try { localStorage.setItem(HKEY, JSON.stringify(st)); return true; } catch (e) { return false; } }
  function addAttempt(st, a) { st.attempts.unshift(a); if (st.attempts.length > 20) st.attempts.length = 20; }

  window.SAGA_DAYS = { better: better, loadStore: loadStore, saveStore: saveStore, addAttempt: addAttempt, cleared: cleared, list: DAYS, status: status, record: record, rec: rec, topMiss: topMiss, key: key, rng: rng };
})();

/* dialog.js */
/* AIRLINE SAGA — 직원 대사(카운터 접객 일본어) + 음성 배역
   승객 대사는 mission_ci01.js의 p.say. 음성은 일본어(ja) 문장 그대로를 열쇠로 찾음 → 문장을 고치면 음성도 다시 만들어야 함 */
(function () {
  var L = function (ja, ko, en) { return { ja: ja, ko: ko, en: en }; };
  window.DIALOG = {
    staff: {
      greet: L('おはようございます。航空券とパスポートをお願いいたします。', '안녕하세요. 항공권과 여권을 부탁드립니다.', 'Good morning. May I see your ticket and passport, please?'),
      pnrOk: L('ご予約を確認いたしました。', '예약을 확인했습니다.', 'I have found your booking.'),
      ppTake: L('パスポートをお預かりいたします。', '여권을 잠시 받겠습니다.', 'Let me take your passport for a moment.'),
      nameDiff: L('恐れ入ります。ご予約のお名前とパスポートのお名前が一部異なりますので、確認させていただきます。', '죄송합니다. 예약하신 이름과 여권의 이름이 일부 달라서 확인하겠습니다.', 'Excuse me. The name on your booking differs slightly from your passport, so let me check.'),
      visaNg: L('申し訳ございません。ビザの有効期限が過ぎておりますので、このままではご搭乗いただけません。', '죄송합니다. 비자 유효기간이 지나서 이대로는 탑승하실 수 없습니다.', 'I am very sorry. Your visa has expired, so we cannot accept you for this flight as it is.'),
      seatAsk: L('お席のご希望はございますか？', '원하시는 좌석이 있으신가요?', 'Do you have a seat preference?'),
      seatConfirm: L('こちらのお席でよろしいでしょうか。', '이 좌석으로 배정해 드려도 괜찮으실까요?', 'Would this seat be all right for you?'),
      exitExplain: L('非常口座席は、緊急の際に乗務員のお手伝いをお願いするお席です。ご協力いただけますか？', '비상구 좌석은 비상시 승무원을 도와주시는 자리입니다. 협조해 주실 수 있나요?', 'Exit row passengers are asked to help the crew in an emergency. Would you be willing to assist?'),
      exitSign: L('こちらが非常口座席のご案内です。内容をご確認のうえ、こちらにご署名をお願いいたします。', '이것이 비상구 좌석 안내문입니다. 내용을 확인하신 뒤 여기에 서명 부탁드립니다.', 'Here is the exit row information card. Please read it and sign here.'),   /* 24차: 비상구 좌석 서명(Vela 교육용 규정) */
      /* 27차: 미국행 스루 수하물 안내(직원) · 승객 대답(공통) */
      usNotice: L('ホノルルまでお荷物をお預かりします。アメリカで最初に着く空港で一度お荷物をお受け取りいただき、税関の検査を受けてください。食品などの申告はお客様ご自身でお願いいたします。お荷物はTSAが開けて検査することがありますので、鍵はかけないか、TSAロックをお使いください。', '호놀룰루까지 짐을 맡아 드리겠습니다. 미국에서 처음 도착하는 공항에서 짐을 한 번 찾아 세관 검사를 받아 주세요. 식품 등의 신고는 고객님께서 직접 해 주셔야 합니다. 짐은 TSA가 열어 검사할 수 있으니 잠그지 않거나 TSA 잠금장치를 사용해 주세요.', 'Your bags are checked through to Honolulu. Please collect them once at the first US airport and go through customs. Declaring food and similar items is up to you. TSA may open the bags for inspection, so please leave them unlocked or use a TSA lock.'),
      usPaxOk: L('わかりました。鍵は外しておきます。', '알겠습니다. 잠금은 풀어 둘게요.', 'Got it. I will leave them unlocked.'),
      exitNo: L('申し訳ございません。乳幼児をお連れのお客様には、非常口座席をご案内できません。前方の通路側のお席はいかがでしょうか。', '죄송합니다. 유아를 동반하신 고객님께는 비상구 좌석을 배정해 드릴 수 없습니다. 앞쪽 통로 좌석은 어떠실까요?', 'I am sorry, we cannot offer an exit row seat to passengers travelling with an infant. How about an aisle seat near the front?'),
      weigh: L('お預けのお荷物を、こちらにお載せください。', '맡기실 짐을 이쪽에 올려 주세요.', 'Please place the bag you are checking in here.'),
      dg: L('お荷物はご自身でお詰めになりましたか。お荷物から目を離されたことはございませんか。他の方からお預かりになった物や、ライター、モバイルバッテリー、スプレーなどは入っていませんか。', '짐은 직접 꾸리셨나요? 짐에서 눈을 떼거나 자리를 비우신 적이 있으신가요? 다른 분에게 받은 물건이나 라이터, 보조배터리, 스프레이 등이 들어 있나요?', 'Did you pack your bags yourself? Have they been out of your sight at any time? Is there anything from someone else, or any lighters, power banks or sprays inside?'),
      pbOut: L('モバイルバッテリーはお預けいただけませんので、一度お出しいただけますか。', '보조배터리는 맡기실 수 없으니 한번 꺼내 주시겠어요?', 'Power banks cannot be checked in. Could you take them out, please?'),
      over: L('無料でお預かりできる23キロを超えております。超過料金をお支払いいただくか、機内持ち込みの制限内で、お荷物の一部を手荷物にお移しいただけます。', '무료 위탁 허용량인 23kg을 초과했습니다. 초과 요금을 내시거나, 기내 반입 제한 범위 안에서 일부 물품을 기내 가방으로 옮기실 수 있습니다.', 'Your bag is over the free 23 kg. You can pay the excess fee, or move some items to your carry-on within the cabin limits.'),
      bpIssue: L('お待たせいたしました。こちらが搭乗券です。', '기다려 주셔서 감사합니다. 탑승권입니다.', 'Thank you for waiting. Here is your boarding pass.'),
      deny: L('ご搭乗のご案内ができず、申し訳ございません。担当者から詳しくご説明いたします。', '탑승을 도와드리지 못해 죄송합니다. 담당자가 자세히 설명해 드리겠습니다.', 'I am sorry we cannot accept you for this flight. A supervisor will explain the details.'),
      bye: function (gate, board) { return L('搭乗口は' + gate + '番、搭乗開始は' + board + 'です。いってらっしゃいませ。', '탑승구는 ' + gate + '번, 탑승 시작은 ' + board + '입니다. 즐거운 여행 되세요.', 'Gate ' + gate + ', boarding starts at ' + board + '. Have a good flight.'); }
    },
    /* 음성 배역 (Style-Bert-VITS2) — 승객 그림(art)별로 고정, 한국 근무지도 같은 목소리 */
    cast: {
      staff: { voice: 'ami' },
      passenger_female_01: { voice: 'tsukuyomi' },
      passenger_male_02: { voice: 'M1' },
      passenger_female_03: { voice: 'F2', pitch: 0.96, length: 1.06 },
      passenger_male_03: { voice: 'M2', pitch: 0.95, length: 1.05 },
      passenger_male_01: { voice: 'M1', pitch: 1.07, length: 0.97, style: 'Happy', sw: 0.6 },
      passenger_female_02: { voice: 'lux' }
    }
  };
})();

/* lessons.js */
window.LESSONS={"ciq/0-4":{"ja":"事前に送る旅客の情報（API・PNR）と電子渡航認証","ko":"미리 보내는 승객 정보(API·PNR)와 전자여행허가","en":"Passenger Data Sent in Advance (API, PNR) and Electronic Travel Authorisations"},"ciq/1-1":{"ja":"旅券と査証 ― カウンターで何を確認するか","ko":"여권과 비자 — 카운터에서 무엇을 확인하나","en":"Passports and Visas: What to Check at the Counter"},"ciq/1-2":{"ja":"TIMATIC ― 渡航条件を確認するためのデータベース","ko":"TIMATIC — 입국 조건을 찾는 도구","en":"TIMATIC: The Tool for Looking Up Entry Requirements"},"ciq/1-4":{"ja":"入国拒否と送還の実際","ko":"입국 거부와 송환의 실제","en":"Refusal of Entry and Removal in Practice"},"passenger/1-1":{"ja":"カウンターオープン前の準備とレイアウト","ko":"카운터 오픈 전 준비와 레이아웃","en":"Getting the Counter Ready, and How to Lay It Out"},"passenger/1-3":{"ja":"チェックインの流れとパスポート・ビザ確認","ko":"체크인 흐름과 여권·비자 확인","en":"The Check-in Flow and Checking Passports and Visas"},"passenger/1-4":{"ja":"以遠区間・乗り継ぎのお客様の手続き","ko":"이원 구간·환승 승객 수속","en":"Passengers with Onward and Connecting Flights"},"passenger/1-5":{"ja":"座席指定・アップグレードと非常口座席","ko":"좌석 배정·업그레이드와 비상구 열 좌석","en":"Seat Assignment, Upgrades and Exit Row Seats"},"passenger/1-6":{"ja":"特別対応① 幼児・小児、妊娠中・医療の配慮が必要なお客様","ko":"특별 승객 ① 유아·소아, 임산부·의료 배려 승객","en":"Special Assistance 1: Infants, Children, Pregnant Passengers and Medical Needs"},"passenger/1-7":{"ja":"特別対応② 車いす・お身体の不自由なお客様、お一人で旅行するお子様","ko":"특별 승객 ② 휠체어·장애인 승객, 비동반 소아","en":"Special Assistance 2: Wheelchair Users, Passengers with Disabilities and Unaccompanied Minors"},"passenger/1-8":{"ja":"特別対応③ ペットの輸送","ko":"특별 승객 ③ 반려동물 운송","en":"Special Assistance 3: Carrying Pets"},"passenger/1-10":{"ja":"手荷物規定① 受託・機内持ち込み・超過","ko":"수하물 규정 ① 위탁·기내·초과","en":"Baggage Rules 1: Checked, Carry-on and Excess"},"passenger/1-12":{"ja":"危険物の基礎 ― お客様の手荷物で気をつけるもの","ko":"위험물 기초 — 승객 수하물에서 주의할 것","en":"Dangerous Goods Basics: What to Watch in Passenger Baggage"},"passenger/1-13":{"ja":"リチウム電池とモバイルバッテリー ― 日韓の最新ルール","ko":"리튬 배터리와 보조배터리 — 한일 최신 규정","en":"Lithium Batteries and Power Banks: the Latest Rules in Japan and Korea"},"passenger/2-2":{"ja":"ゲートバッグと車いすの取り扱い","ko":"게이트 백과 휠체어 처리","en":"Gate-Checked Bags and Wheelchairs"},"passenger/2-3":{"ja":"開披検査への対応","ko":"개방 검사 대응","en":"Handling a Bag Search with the Passenger"},"passenger/5-4":{"ja":"遅延対応 ― ご案内・食事券・遅延証明","ko":"지연 처리 — 안내·식사 쿠폰·지연 증명","en":"Delays: Information, Meal Vouchers and Certificates"},"passenger/5-6":{"ja":"欠航対応 ― 振替・エンドース・補償案内・苦情対応","ko":"결항 처리 — 대체편·엔도스·보상 안내·클레임 접수","en":"Cancellations: Rebooking, Endorsement, Compensation and Claims"}};

/* scene.js */
/* 2.5D 카운터 장면 + SD(2.5등신) 인물 — 캐릭터는 교체 가능한 레이어(SPEC: 영상과 공용 규격으로 확장 예정)
   window.SPRITES.sd(o) : 발끝 중앙 (0,0) 기준 SVG 문자열 */
(function () {
  var S = window.SPRITES = {};
  function shade(hex, k) { var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    r = Math.max(0, Math.min(255, Math.round(r * k))); g = Math.max(0, Math.min(255, Math.round(g * k))); b = Math.max(0, Math.min(255, Math.round(b * k)));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1); }
  S.shade = shade;
  /* o: skin hair style(bob|short|long|bun) outfit g tie baby expr(happy|neutral|worried|upset) flip uniform(bool) scale */
  S.sd = function (o) {
    o = o || {}; var sk = o.skin || '#f6d7bf', hr = o.hair || '#3b2a22', of = o.outfit || '#5a7bb5', ex = o.expr || 'neutral';
    var s = '';
    s += '<ellipse cx="0" cy="0" rx="22" ry="5" fill="rgba(24,50,61,.16)"/>';
    /* 다리 */
    s += '<rect x="-11" y="-26" width="9" height="24" rx="4" fill="' + (o.uniform ? '#1d3a46' : shade(of, .55)) + '"/><rect x="2" y="-26" width="9" height="24" rx="4" fill="' + (o.uniform ? '#1d3a46' : shade(of, .55)) + '"/>';
    s += '<rect x="-13" y="-5" width="12" height="6" rx="3" fill="#2c2c33"/><rect x="1" y="-5" width="12" height="6" rx="3" fill="#2c2c33"/>';
    /* 몸 */
    s += '<path d="M-17 -24 Q-18 -54 0 -56 Q18 -54 17 -24 Z" fill="' + of + '"/>';
    if (o.uniform) s += '<path d="M-6 -56 L0 -44 L6 -56" fill="#fff"/><path d="M-7 -54 Q0 -46 7 -54 L4 -50 Q0 -44 -4 -50 Z" fill="#e3a73b"/><circle cx="9" cy="-44" r="2.4" fill="#e3a73b"/>';
    if (o.tie) s += '<path d="M0 -55 l-3 5 l3 13 l3 -13 z" fill="#b83b3b"/>';
    /* 팔 */
    s += '<rect x="-23" y="-52" width="8" height="24" rx="4" fill="' + shade(of, .9) + '"/><rect x="15" y="-52" width="8" height="24" rx="4" fill="' + shade(of, .9) + '"/>';
    s += '<circle cx="-19" cy="-27" r="4.5" fill="' + sk + '"/><circle cx="19" cy="-27" r="4.5" fill="' + sk + '"/>';
    if (o.baby) s += '<g transform="translate(-4 -40)"><ellipse rx="12" ry="9" fill="#fff4d6" stroke="#e7d39b" stroke-width="1.5"/><circle cx="-4" cy="-3" r="7" fill="' + sk + '"/><path d="M-10 -6 q6 -8 12 0" fill="#c9a77a"/><circle cx="-6" cy="-3" r="1" fill="#333"/><circle cx="-2" cy="-3" r="1" fill="#333"/></g>';
    /* 머리 (큰 머리 = SD) */
    var hy = -82;
    if (o.style === 'long') s += '<path d="M-27 ' + (hy - 2) + ' Q-30 ' + (hy + 30) + ' -18 ' + (hy + 34) + ' L18 ' + (hy + 34) + ' Q30 ' + (hy + 30) + ' 27 ' + (hy - 2) + ' Z" fill="' + hr + '"/>';
    if (o.style === 'bun') s += '<circle cx="-2" cy="' + (hy - 30) + '" r="10" fill="' + hr + '"/>';
    s += '<circle cx="0" cy="' + hy + '" r="27" fill="' + sk + '"/>';
    /* 앞머리 */
    var top = hy - 27;
    if (o.style === 'short') s += '<path d="M-27 ' + (hy - 2) + ' Q-26 ' + (top - 4) + ' 0 ' + (top - 3) + ' Q26 ' + (top - 4) + ' 27 ' + (hy - 2) + ' Q18 ' + (hy - 14) + ' 4 ' + (hy - 12) + ' Q-12 ' + (hy - 16) + ' -27 ' + (hy - 2) + ' Z" fill="' + hr + '"/>';
    else s += '<path d="M-28 ' + (hy + 6) + ' Q-30 ' + (top - 6) + ' 0 ' + (top - 4) + ' Q30 ' + (top - 6) + ' 28 ' + (hy + 6) + ' Q20 ' + (hy - 10) + ' 2 ' + (hy - 14) + ' Q-16 ' + (hy - 8) + ' -28 ' + (hy + 6) + ' Z" fill="' + hr + '"/>';
    /* 얼굴 */
    var ey = hy + 4;
    if (ex === 'happy') s += '<path d="M-12 ' + ey + ' q4 -5 8 0 M4 ' + ey + ' q4 -5 8 0" stroke="#2b2b33" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    else s += '<ellipse cx="-8" cy="' + ey + '" rx="3.3" ry="4.4" fill="#2b2b33"/><ellipse cx="8" cy="' + ey + '" rx="3.3" ry="4.4" fill="#2b2b33"/><circle cx="-7" cy="' + (ey - 1.6) + '" r="1.2" fill="#fff"/><circle cx="9" cy="' + (ey - 1.6) + '" r="1.2" fill="#fff"/>';
    if (ex === 'worried' || ex === 'upset') s += '<path d="M-13 ' + (ey - 9) + ' l8 ' + (ex === 'upset' ? 3 : -2) + ' M13 ' + (ey - 9) + ' l-8 ' + (ex === 'upset' ? 3 : -2) + '" stroke="#2b2b33" stroke-width="2" stroke-linecap="round"/>';
    s += '<ellipse cx="-15" cy="' + (ey + 8) + '" rx="4.5" ry="2.6" fill="#f3a9a0" opacity=".6"/><ellipse cx="15" cy="' + (ey + 8) + '" rx="4.5" ry="2.6" fill="#f3a9a0" opacity=".6"/>';
    var my = ey + 11;
    if (ex === 'happy') s += '<path d="M-5 ' + my + ' q5 6 10 0 z" fill="#b5524b"/>';
    else if (ex === 'upset') s += '<path d="M-5 ' + (my + 3) + ' q5 -5 10 0" stroke="#7a3b3b" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    else if (ex === 'worried') s += '<path d="M-4 ' + (my + 1) + ' h8" stroke="#7a3b3b" stroke-width="2.2" stroke-linecap="round"/>';
    else s += '<path d="M-4 ' + my + ' q4 3 8 0" stroke="#7a3b3b" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    if (o.uniform && o.style === 'bun') s += '<rect x="-14" y="' + (top + 2) + '" width="28" height="5" rx="2.5" fill="#e3a73b" opacity=".9"/>';
    var tr = 'translate(' + (o.x || 0) + ' ' + (o.y || 0) + ') scale(' + ((o.flip ? -1 : 1) * (o.scale || 1)) + ' ' + (o.scale || 1) + ')';
    return '<g transform="' + tr + '">' + s + '</g>';
  };
  S.logo = function (x, y, r, c1, c2) { /* Vela Air: 돛(sail) + 별 — 가상 브랜드 */
    return '<g transform="translate(' + x + ' ' + y + ')"><circle r="' + r + '" fill="' + c1 + '"/><path d="M' + (-r * .45) + ' ' + (r * .45) + ' L' + (r * .05) + ' ' + (-r * .62) + ' L' + (r * .1) + ' ' + (r * .45) + ' Z" fill="#fff"/><path d="M' + (r * .22) + ' ' + (r * .35) + ' L' + (r * .22) + ' ' + (-r * .25) + ' Q' + (r * .6) + ' ' + (r * .1) + ' ' + (r * .52) + ' ' + (r * .35) + ' Z" fill="#fff" opacity=".85"/><circle cx="' + (r * .42) + '" cy="' + (-r * .45) + '" r="' + (r * .14) + '" fill="' + c2 + '"/></g>';
  };
  function bag(x, y, kg, c) { var h = 20 + Math.min(18, kg); return '<g transform="translate(' + x + ' ' + y + ')"><rect x="-13" y="' + (-h) + '" width="26" height="' + h + '" rx="5" fill="' + c + '"/><rect x="-4" y="' + (-h - 7) + '" width="8" height="8" rx="2" fill="none" stroke="#4a4f57" stroke-width="2.4"/><rect x="-13" y="' + (-h / 2) + '" width="26" height="3" fill="rgba(0,0,0,.15)"/></g>'; }
  S.bag = bag;
  /* 장면 기본 틀 (한 번만 그림) */
  S.scene = function (fids) {
    var w = '';
    w += '<defs><linearGradient id="sk" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#bfe0f2"/><stop offset="1" stop-color="#eaf5fb"/></linearGradient>' +
         '<linearGradient id="fl" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e9eef1"/><stop offset="1" stop-color="#d3dde2"/></linearGradient></defs>';
    w += '<rect width="400" height="235" fill="#eef3f6"/>';
    /* 창과 바깥 */
    w += '<rect x="0" y="0" width="400" height="104" fill="url(#sk)"/>';
    w += '<g opacity=".9"><path d="M250 74 h120 q14 0 20 8 l-6 3 h-140 z" fill="#ffffff"/><path d="M352 74 l14 -22 h10 l-6 22 z" fill="#0f5e6e"/>' + S.logo(366, 62, 6, '#0f5e6e', '#e3a73b') + '<rect x="262" y="77" width="70" height="3" fill="#c7d6de"/></g>';
    for (var i = 0; i < 9; i++) w += '<rect x="' + (i * 46) + '" y="0" width="4" height="104" fill="#9fb6c2"/>';
    w += '<rect x="0" y="100" width="400" height="6" fill="#9fb6c2"/>';
    /* 바닥 (원근 타일) */
    w += '<path d="M0 106 H400 V235 H0 Z" fill="url(#fl)"/>';
    for (var j = 0; j < 7; j++) w += '<line x1="' + (-120 + j * 110) + '" y1="235" x2="' + (60 + j * 50) + '" y2="106" stroke="#c9d4da" stroke-width="1"/>';
    for (var k = 0; k < 5; k++) w += '<line x1="0" y1="' + (120 + k * k * 6 + k * 10) + '" x2="400" y2="' + (120 + k * k * 6 + k * 10) + '" stroke="#c9d4da" stroke-width="1"/>';
    /* FIDS·카운터 번호 */
    w += '<g transform="translate(18 14)"><rect width="150" height="40" rx="6" fill="#132c36"/><text x="10" y="17" font-family="IBM Plex Mono,monospace" font-size="11" fill="#ffcf6b" id="fids1">' + fids[0] + '</text><text x="10" y="32" font-family="IBM Plex Mono,monospace" font-size="10" fill="#7be0b2" id="fids2">' + fids[1] + '</text></g>';
    w += '<g transform="translate(182 14)"><rect width="46" height="26" rx="6" fill="#0f5e6e"/><text x="23" y="18" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="12" font-weight="700" fill="#fff" id="ctrno">' + fids[2] + '</text></g>';
    /* 줄 서는 곳: 차단봉 */
    w += '<g id="queue"></g>';
    w += '<g stroke="#8aa0ab" stroke-width="2"><line x1="250" y1="150" x2="390" y2="150"/></g>';
    for (var q = 0; q < 4; q++) w += '<rect x="' + (250 + q * 46) + '" y="138" width="4" height="22" rx="2" fill="#8aa0ab"/>';
    /* 직원 (뒤) */
    w += '<g id="agent">' + S.sd({ x: 78, y: 182, skin: '#f6d7bf', hair: '#2f2420', style: 'bun', outfit: '#0f5e6e', uniform: true, expr: 'happy', scale: .95 }) + '</g>';
    /* 카운터 (2.5D: 윗면 + 앞면) */
    w += '<path d="M20 150 L176 150 L196 166 L40 166 Z" fill="#cbd7de"/>';
    w += '<path d="M40 166 L196 166 L196 222 L40 222 Z" fill="#e8eef1"/><path d="M176 150 L196 166 L196 222 L176 206 Z" fill="#b7c6ce"/>';
    w += S.logo(118, 192, 14, '#0f5e6e', '#e3a73b') + '<text x="138" y="197" font-family="M PLUS Rounded 1c,sans-serif" font-weight="800" font-size="12" fill="#0f5e6e">Vela Air</text>';
    w += '<rect x="44" y="132" width="38" height="24" rx="3" fill="#33435a"/><rect x="47" y="135" width="32" height="17" rx="2" fill="#7fd1c7"/><rect x="60" y="156" width="6" height="4" fill="#33435a"/>';
    /* 저울 (손님 쪽) */
    w += '<path d="M198 210 L240 210 L250 218 L208 218 Z" fill="#9fb3be"/><rect x="200" y="196" width="22" height="12" rx="3" fill="#0a2b1f"/><text x="211" y="205" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="7.5" fill="#8ef0b5" id="scalelcd">0.0</text>';
    w += '<g id="scalebag"></g>';
    /* 손님 자리 */
    w += '<g id="paxwrap" style="transition:transform .7s ease"><g id="pax"></g></g>';
    return '<svg viewBox="0 0 400 235" role="img" aria-label="check-in counter">' + w + '</svg>';
  };
})();

/* stage.js */
/* AIRLINE SAGA — 체크인 장면 레이어 (GPT 제작 PNG/WebP 에셋)
   이미지 = 배경·직원·승객·카운터·모니터·저울·캐리어·마스코트
   HTML   = 말풍선·FIDS 글자·무게 표시·여권·예약·좌석도·탑승권·판단창 (게임 로직이 갱신)
   배치 단위: 장면 폭/높이에 대한 %. x = 기준점(발 중앙) 가로 위치, b = 발 위치(아래에서), h = 보이는 높이
   에셋을 불러오지 못하면 기존 SVG 인물(window.SPRITES)로 대체 — 임시용 */
(function () {
  var A = window.ASSETS || {}, SP = window.SPRITES;
  var AR = 16 / 9; /* 배경 1600×900 */
  var STG = window.STG = {};
  function box(id, x, b, h, flip) {
    var a = A[id]; if (!a) return '';
    var w = h * (a.w / a.h) / AR;
    var left = x - (flip ? (1 - a.px) : a.px) * w;
    var bottom = b - (1 - a.py) * h;
    return 'left:' + left.toFixed(2) + '%;bottom:' + bottom.toFixed(2) + '%;height:' + h + '%;width:' + w.toFixed(2) + '%;' + (flip ? 'transform:scaleX(-1);' : '');
  }
  function img(id, cls, x, b, h, flip, extra) {
    var a = A[id];
    if (!a) return '';
    return '<img class="sp ' + (cls || '') + '" src="' + a.src + '" alt="" draggable="false" data-asset="' + id + '" style="' + box(id, x, b, h, flip) + (extra || '') + '" onerror="STG.fail(this)">';
  }
  STG.has = function (id) { return !!A[id]; };
  STG.src = function (id) { return A[id] ? A[id].src : ''; };
  STG.img = img;
  /* 로드 실패 시 SVG 임시 인물로 바꿈 */
  STG.fail = function (el) {
    var id = el.getAttribute('data-asset') || '';
    var look = el.getAttribute('data-look');
    if (!SP || !/^(passenger|staff)/.test(id)) { el.style.visibility = 'hidden'; return; }
    var o = look ? JSON.parse(look) : { uniform: /^staff/.test(id), style: 'bun', outfit: '#24346b' };
    var s = document.createElement('div'); s.className = 'sp fb'; s.setAttribute('style', el.getAttribute('style'));
    s.innerHTML = '<svg viewBox="-40 -120 80 122" preserveAspectRatio="xMidYMax meet" style="width:100%;height:100%">' + SP.sd(Object.assign({}, o, { x: 0, y: 0, scale: 1 })) + '</svg>';
    el.replaceWith(s);
  };
  /* 사진(여권)·얼굴 아이콘: 승객 PNG의 머리·어깨 부분 */
  STG.face = function (id, cls) {
    var a = A[id]; if (!a) return '';
    return '<span class="face ' + (cls || '') + '" style="background-image:url(\'' + a.src + '\');background-position:' + (a.px * 100).toFixed(0) + '% ' + (cls === 'ppface' ? 1 : 3) + '%"></span>';
  };
  /* 여권 사진: 정면 증명사진(AIRLINE_SAGA_PORTRAITS). 사진 인물 키(p.photo)는 장면 인물(p.art)과 따로 지정 가능 — 사진 불일치 미션용 */
  STG.photoKey = function (p) { var k = p.photo || p.art; return 'passport_' + String(k).replace('passenger_', '') + '_front_01'; };
  STG.portrait = function (p, size) {
    var id = STG.photoKey(p);
    if (A[id]) return '<img class="as-passport-photo' + (size ? ' as-passport-photo--' + size : '') + '" src="' + A[id].src + '" alt="">';
    return STG.face(p.photo || p.art, 'ppface');
  };
  STG.mini = function (p) { /* 판단창 등의 둥근 얼굴 아이콘 */
    var id = STG.photoKey(p);
    if (A[id]) return '<span class="face mface pt" style="background-image:url(\'' + A[id].src + '\')"></span>';
    return STG.face(p.art, 'mface');
  };
  STG.mascot = function (who, pose, cls) {
    var id = who + '_' + (pose || 'idle') + '_01';
    return A[id] ? '<img class="mascot ' + (cls || '') + '" src="' + A[id].src + '" alt="' + (who === 'koradon' ? 'コラドン' : 'コラリン') + '" draggable="false">' : '';
  };
  /* 장면 */
  STG.html = function (o) {
    var h = '<div class="stage" id="stage">';
    h += '<img class="bg" src="' + STG.src(o.evening ? 'checkin_bg_02' : 'checkin_bg_01') + '" alt="" draggable="false">';
    /* 배경 안내판(빈 칸)에 글자를 얹음 */
    h += '<div class="sign s1"><b id="fids1">' + o.flight + '</b><span id="fids2">' + o.to + ' ' + o.std + '</span></div>';
    h += '<div class="sign s2"><b id="ctrno">' + o.counter + '</b></div>';
    h += '<div id="queue" class="lay" style="isolation:isolate"></div>';   /* 22차: 대기줄의 z-index가 이 층 안에서만 쓰이게(현재 승객·동행·직원보다 항상 뒤) */
    h += '<div id="agentwrap" class="lay">' + img('staff_checkin_greet_01', 'agent', 21, -14, 78, false, '') + '</div>';
    h += '<div class="lay">' + img('prop_counter_01', 'counter', 22, -2, 30) + img('prop_monitor_01', 'monitor', 36, 23, 19) + '</div>';
    h += '<div class="lay">' + img('prop_scale_01', 'scale', 54, 2, 25) + '<div id="scalebag" class="lay"></div><div class="lcdpill" id="lcdpill"><span id="scalelcd">0.0</span> kg</div></div>';
    h += '<div id="paxwrap" class="lay"><div id="pax" class="lay"></div></div>';
    h += '</div>';
    return h;
  };
  /* 대기줄: 다음 승객 2~3명을 작게, 뒤쪽 바닥에 */
  STG.queue = function (list) {
    var pos = [[88, 33, 40], [95, 35, 37], [101, 36.5, 35]], h = '';
    list.slice(0, 3).forEach(function (p, i) { h = img(p.art, 'q', pos[i][0], pos[i][1], pos[i][2] * ((A[p.art] && A[p.art].hr) || 1), false, 'z-index:' + (5 - i) + ';') .replace('<img', '<img data-look=\'' + JSON.stringify(p.look || {}) + '\'') + h; });
    var q = document.getElementById('queue'); if (q) q.innerHTML = h;
  };
  /* 현재 승객 + 만족도·유아 표시 */
  STG.pax = function (p, mood) {
    var el = document.getElementById('pax'); if (!el) return;
    if (!p) { el.innerHTML = ''; return; }
    var cur = el.querySelector('img,.fb');
    var m = mood >= 75 ? 'happy' : mood >= 50 ? 'neutral' : mood >= 30 ? 'worried' : 'upset';
    var pips = Math.max(1, Math.round(mood / 20));
    var meter = '<div class="mood m-' + m + '"><i style="width:' + Math.round(mood) + '%"></i></div>';
    /* 표정: 만족도에 따라 같은 자리의 표정 그림으로 교체(v03 표정 세트가 있는 승객만) */
    var ex = m === 'neutral' ? p.art : p.art + '_' + m + '_01'; if (!A[ex]) ex = p.art;
    if (cur && cur.getAttribute('data-asset') === p.art && el.dataset.pid === p.id) {
      var mm = el.querySelector('.mood'); if (mm) mm.outerHTML = meter;
      if (cur.tagName === 'IMG' && cur.getAttribute('data-expr') !== ex) { cur.setAttribute('data-expr', ex); cur.src = A[ex].src; }
      var prev = +el.dataset.mood; el.dataset.mood = mood;
      if (mood < prev - 2) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
      if (mood > prev + 2) { el.classList.remove('hop'); void el.offsetWidth; el.classList.add('hop'); }
      return;
    }
    el.dataset.pid = p.id; el.dataset.mood = mood;
    var hr = (A[p.art] && A[p.art].hr) || 1, comp = (p.with || []).map(function (w, k) { if (w.prop) return img(w.prop, 'comp', 84, 1, 15, false); var wh = (A[w.art] && A[w.art].hr) || 1; return img(w.art, 'comp', 86 + k * 8, 4, 78 * wh, false, 'z-index:' + (2 - k) + ';'); }).join('');
    el.innerHTML = comp + img(p.art, 'paxi', 73, 1, 81 * hr, false).replace('<img', '<img data-expr="' + ex + '" data-look=\'' + JSON.stringify(p.look || {}) + '\'').replace('src="' + A[p.art].src + '"', 'src="' + A[ex].src + '"') + meter + (p.inf ? '<div class="infb">INF</div>' : '');
  };
  /* 직원 포즈: idle | greet | check | explain (짧은 페이드) */
  var curPose = 'greet', poseT = null;
  STG.pose = function (pose, back) {
    var el = document.querySelector('#agentwrap img'); if (!el) return;
    clearTimeout(poseT);
    if (pose !== curPose) {
      var id = 'staff_checkin_' + pose + '_01';
      if (!A[id]) return;
      curPose = pose; el.style.opacity = .35;
      setTimeout(function () { el.setAttribute('style', box(id, 21, -14, 78, false)); el.src = A[id].src; el.setAttribute('data-asset', id); }, 90);
    }
    if (back) poseT = setTimeout(function () { STG.pose('idle'); }, back);
  };
  /* 저울 위 짐 */
  STG.bag = function (kind) {
    var el = document.getElementById('scalebag'); if (!el) return;
    var pill = document.getElementById('lcdpill');
    if (!kind) { el.innerHTML = ''; if (pill) pill.classList.remove('on'); return; }
    if (kind === 'stroller') el.innerHTML = '<svg class="sp drop" viewBox="190 150 64 52" style="left:46.5%;bottom:7%;height:18%;width:12%">' + SP.bag(222, 197, 6.5, '#9aa5ad') + '</svg>';
    else if (kind === 'case' || !A[kind]) el.innerHTML = img('prop_luggage_01', 'drop', 52, 8.5, 25, false);
    else el.innerHTML = img(kind, 'drop', 52, 8.5, /golf/.test(kind) ? 38 : 25, false);
    if (pill) pill.classList.add('on');
  };
  /* 미리 불러오기 */
  STG.preload = function () { Object.keys(A).forEach(function (k) { var i = new Image(); i.src = A[k].src; }); };
})();

/* assets_split.js */
/* AIRLINE SAGA — 그림 순서대로 받기 (사이트용 분할 빌드에서만, stage.js 다음에 들어감)
   단일 HTML(그림 내장)은 STG.preload가 89개를 한꺼번에 미리 읽지만, 사이트에서는 첫 화면이 무거워지므로 순서를 나눔
   1) 타이틀: 화면에 보이는 그림만(브라우저가 표시할 때 받음) — 미리 받기 없음
   2) 타이틀이 뜬 뒤 쉬는 시간: 근무 공통 그림(배경·직원·카운터·단말·저울·기본 짐·안내 캐릭터)
   3) 근무 시작(새 근무 감지): 이번 근무 승객이 쓰는 그림(인물·표정·여권 사진·동행·짐) — 지금 승객부터
   그 밖의 그림은 미리 받지 않고 화면에 나올 때 받음. 미리 받기 큐의 동시 요청은 최대 4개(화면이 직접 받는 그림은 이 수에 들지 않음)
   22차: 성공·실패 구분, 8초 넘는 그림은 자리를 비움, 실패는 1회 다시, 다음 근무에서 실패분 다시, 새 근무 때 지난 큐 정리 */
(function () {
  if (!window.STG) return;
  var A = window.ASSETS || {}, done = {}, q = [], busy = 0, MAXC = 4, lastS = null, TMO = 8000;
  /* done[k]: 'loading' | 'loaded' | 'failed'(재시도 1회 후에도 실패) — 22차 IMG-R02: 성공·실패 구분, 8초 넘으면 자리를 비워 다음 그림으로, 실패는 1회 다시, 다음 근무에서 실패분 다시 */
  var ST = STG._pre = { common: 0, shift: 0, requested: [], shifts: 0, loaded: 0, failed: [], retried: 0, timeouts: 0 }, tries = {};
  var COMMON = ['checkin_bg_01', 'checkin_bg_02', 'staff_checkin_greet_01', 'staff_checkin_idle_01', 'staff_checkin_check_01', 'staff_checkin_explain_01',
    'prop_counter_01', 'prop_monitor_01', 'prop_scale_01', 'prop_luggage_01', 'prop_cabin_bag_01', 'prop_bagtag_01', 'prop_boarding_pass_01', 'prop_passport_01',
    'koradon_idle_01', 'koradon_greet_01', 'korarin_idle_01', 'korarin_greet_01'];
  function pump() {
    while (busy < MAXC && q.length) {
      var k = q.shift(); if (done[k] === 'loading' || done[k] === 'loaded') continue;
      done[k] = 'loading'; busy++; tries[k] = (tries[k] || 0) + 1; if (tries[k] === 1) ST.requested.push(k); else ST.retried++;
      (function (k) {
        var im = new Image(), fin = false, slot = true;
        function free() { if (slot) { slot = false; busy--; } }
        var tm = setTimeout(function () { ST.timeouts++; free(); pump(); }, TMO);   // 느린 그림: 자리만 비우고 받기는 계속
        im.onload = function () { if (fin) return; fin = true; clearTimeout(tm); done[k] = 'loaded'; ST.loaded++; free(); pump(); };
        im.onerror = function () { if (fin) return; fin = true; clearTimeout(tm); free();
          if (tries[k] < 2) { done[k] = null; q.push(k); } else { done[k] = 'failed'; if (ST.failed.indexOf(k) < 0) ST.failed.push(k); }
          pump(); };
        im.src = A[k].src;
      })(k);
    }
  }
  function add(keys, front) {
    var ks = keys.filter(function (k) { if (done[k] === 'failed') { done[k] = null; tries[k] = 1; } return A[k] && !done[k] && q.indexOf(k) < 0; });   // 지난번 실패분은 다시(1회)
    q = front ? ks.concat(q) : q.concat(ks); pump(); return ks.length;
  }
  /* 승객 한 명이 쓰는 그림: 데이터 안의 그림 이름·인물(art)의 표정 그림·여권 사진(STG.photoKey)을 모두 모음 */
  function paxKeys(p) {
    var out = {}, seen = [];
    (function walk(o, d) {
      if (!o || d > 4 || typeof o === 'function') return;
      if (typeof o === 'string') { if (A[o]) out[o] = 1; return; }
      if (typeof o !== 'object' || seen.indexOf(o) >= 0) return; seen.push(o);
      if (o.art && A[o.art]) {
        out[o.art] = 1;
        var base = String(o.art).replace(/_(cane|wheelchair)$/, '');   // 지팡이 ↔ 휠체어 그림은 같은 사람
        Object.keys(A).forEach(function (k) { if (k.indexOf(o.art + '_') === 0 || (k.indexOf(base + '_') === 0 && k.indexOf('passenger_') === 0)) out[k] = 1; });   // 표정·휠체어/지팡이 등
        try { var pk = STG.photoKey(o); if (A[pk]) out[pk] = 1; } catch (e) {}
        var own = 'passport_' + base.replace('passenger_', '') + '_front_01'; if (A[own]) out[own] = 1;   // 사진을 바꿔 쓰는 동행도 본인 여권 사진이 나올 수 있음
      }
      /* 25차b(GPT 25-R02): 그림(art) 없이 사진 키만 있는 중첩 인물(Day 1 유아 inf.photo 등)의 여권 사진도 미리 받기 */
      else if (o.photo && typeof o.photo === 'string') { var ph = 'passport_' + o.photo + '_front_01'; if (A[ph]) out[ph] = 1; }
      Object.keys(o).forEach(function (n) { if (n !== 'say') walk(o[n], d + 1); });
    })(p, 0);
    return Object.keys(out);
  }
  function watch() {
    var S = null; try { S = window.AS && AS._S && AS._S(); } catch (e) {}
    if (S && S.list && S !== lastS) {
      lastS = S; ST.shifts++;
      var list = S.list.concat(S.list.late ? [S.list.late] : []), keys = [];
      list.forEach(function (p) { paxKeys(p).forEach(function (k) { if (keys.indexOf(k) < 0) keys.push(k); }); });
      q = []; add(COMMON, true); ST.shift += add(keys, false);   // 지난 근무의 아직 시작 안 한 받기는 버리고 이번 근무부터
    }
  }
  STG.preload = function () {
    var go = function () { ST.common += add(COMMON, false); };
    var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 300); };
    if (document.readyState === 'complete') idle(go); else window.addEventListener('load', function () { idle(go); });
    setInterval(function () { if (!document.hidden) watch(); }, 400);
  };
  STG._paxKeys = paxKeys;
})();

/* voice_remote.js */
/* AIRLINE SAGA — 일본어 대사 음성 (사이트용: 대사별 MP3 파일을 필요할 때 받기)
   voice.js(단일 HTML: 음성 base64 내장)와 같은 VO 인터페이스. 사이트 분할 빌드(tools/build_split.py)에서만 voice.js 대신 들어감
   - 열쇠 = FNV-1a(배역 + '|' + 일본어 문장) → voices/<열쇠>.mp3?v=<빌드 버전>
   - 근무 시작(게임이 VO.stop을 부름)에 이번 근무 승객 대사를 지금 승객부터 차례로 미리 받음. 직원 대사는 고정 대사만 미리, 나머지는 말할 때 받음
   - 동시 요청 최대 4개, 같은 열쇠는 한 번만 받음(받는 중이면 기다림), 받은 것은 이 페이지 안에서 다시 쓰고 브라우저 캐시는 버전 주소로 구분
   - 음성 끔이면 아무것도 받지 않음. 다음 승객·근무 종료(VO.stop) 뒤에 도착한 이전 대사는 재생하지 않음
   - 받기 실패·지연은 소리만 건너뜀(자막·게임 진행은 그대로). 네트워크 오류·서버 오류(5xx)만 한 번 다시 시도, 404 등은 다시 시도하지 않음 */
(function () {
  var VO = window.VO = { on: true };
  var IDX = window.VOICE_INDEX || { v: '0', base: 'voices/', keys: {} };
  var K = IDX.keys, ctx = null, q = [], playing = null, gen = 0;
  var MAXC = 4, WAIT = 2500, RETRY_MS = 1500;
  var data = {}, state = {}, waiters = {}, fq = [], inflight = 0, buf = {}, shiftRef = null, tries = {};
  var ST = VO._stats = { requests: 0, ok: 0, fail: 0, retries: 0, bytes: 0, maxInflight: 0, prefetchQueued: 0, onDemand: 0, played: 0, skipTimeout: 0, skipFail: 0, staleDropped: 0, log: [] };
  function fnv(s) { var h = 0x811c9dc5; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0; } return ('0000000' + h.toString(16)).slice(-8); }
  VO.key = function (cast, ja) { return fnv(cast + '|' + ja); };
  VO.has = function (cast, ja) { return !!K[VO.key(cast, ja)]; };
  VO.count = function () { return Object.keys(K).length; };
  VO.unlock = function () {
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') ctx.resume(); } catch (e) {}
  };
  function url(k) { return (IDX.base || 'voices/') + k + '.mp3?v=' + encodeURIComponent(IDX.v); }
  function done(k) { var w = waiters[k] || []; delete waiters[k]; w.forEach(function (f) { try { f(); } catch (e) {} }); }
  function load(k) {
    state[k] = 'loading'; inflight++; ST.requests++; if (inflight > ST.maxInflight) ST.maxInflight = inflight;
    var t0 = Date.now();
    fetch(url(k)).then(function (r) { if (!r.ok) { var e = new Error('HTTP ' + r.status); e.status = r.status; throw e; } return r.arrayBuffer(); }).then(function (ab) {
      data[k] = ab; state[k] = 'ok'; ST.ok++; ST.bytes += ab.byteLength; ST.log.push([k, ab.byteLength, Date.now() - t0]);
    }).catch(function (e) {
      tries[k] = (tries[k] || 0) + 1;
      if (tries[k] < 2 && !(e && e.status >= 400 && e.status < 500)) {   /* 네트워크 오류·5xx만 한 번 더(404 등은 다시 받아도 같음) */ state[k] = 'retry'; ST.retries++; setTimeout(function () { if (state[k] === 'retry') { state[k] = undefined; want(k, true, true); } }, RETRY_MS); }
      else { state[k] = 'fail'; ST.fail++; }
    }).then(function () { inflight--; if (state[k] !== 'retry') done(k); next(); });
  }
  function next() { while (inflight < MAXC && fq.length) { var k = fq.shift(); if (state[k] === 'queued') load(k); } }
  /* 받을 목록에 넣기(urgent = 지금 말할 대사 → 맨 앞) */
  function want(k, urgent, pre) {
    if (!K[k] || !VO.on) return;
    var s = state[k];
    if (s === 'ok' || s === 'loading' || s === 'fail' || s === 'retry') return;
    if (s === 'queued') { if (urgent) { fq.splice(fq.indexOf(k), 1); fq.unshift(k); } return; }
    state[k] = 'queued'; urgent ? fq.unshift(k) : fq.push(k);
    if (pre) ST.prefetchQueued++; else ST.onDemand++;
    next();
  }
  function cast(p) { return String(p.voice || p.art || '').replace(/_wheelchair$/, '_cane'); }
  function paxKeys(p) { var out = []; if (p && p.say) Object.keys(p.say).forEach(function (n) { var v = p.say[n]; if (v && v.ja) out.push(VO.key(cast(p), v.ja)); }); return out; }
  /* 이번 근무의 승객 대사를 지금 승객부터 → 다음 승객 순으로(이미 받은 것은 건너뜀) */
  function prefetchShift() {
    if (!VO.on || !window.AS || !AS._S) return;
    var S; try { S = AS._S(); } catch (e) { return; }
    if (!S || !S.list) return;
    var fresh = S !== shiftRef; shiftRef = S;
    if (fresh) { Object.keys(state).forEach(function (k) { if (state[k] === 'fail') { state[k] = undefined; tries[k] = 0; } }); }
    var list = S.list.concat(S.list.late ? [S.list.late] : []), from = Math.max(0, S.idx);
    var order = list.slice(from).concat(list.slice(0, from));
    var cur = paxKeys(order[0]);
    cur.slice().reverse().forEach(function (k) { want(k, true, true); });   // 지금 승객 대사는 목록 맨 앞으로
    if (fresh) {
      var D = window.DIALOG && DIALOG.staff;
      if (D) Object.keys(D).forEach(function (n) { var v = D[n]; if (v && typeof v !== 'function' && v.ja) want(VO.key('staff', v.ja), false, true); });
      order.slice(1).forEach(function (p) { paxKeys(p).forEach(function (k) { want(k, false, true); }); });
    }
  }
  function decode(k, cb) {
    if (buf[k]) return cb(buf[k]);
    try { ctx.decodeAudioData(data[k].slice(0), function (ab) { buf[k] = ab; cb(ab); }, function () { cb(null); }); } catch (e) { cb(null); }
  }
  function playItem(it, my) {
    decode(it.k, function (ab) {
      if (my !== gen) { ST.staleDropped++; return; }
      if (!ab) { ST.skipFail++; playing = null; return pump(); }
      var src = ctx.createBufferSource(), g = ctx.createGain(); g.gain.value = 1;
      src.buffer = ab; src.connect(g); g.connect(ctx.destination);
      var fin = function () { if (it.fin || my !== gen) return; it.fin = true; clearTimeout(it.guard); playing = null; setTimeout(pump, 160); };
      src.onended = fin;
      it.guard = setTimeout(fin, ab.duration * 1000 + 700);   /* 기기가 끝 신호를 주지 않아도 다음으로 */
      it.src = src; src.start(); ST.played++;
      if (it.onstart) it.onstart();
    });
  }
  function pump() {
    if (playing || !q.length || !ctx) return;
    var it = q.shift(), my = gen;
    playing = it;
    var s = state[it.k];
    if (s === 'ok') return playItem(it, my);
    if (s === 'fail') { ST.skipFail++; playing = null; return pump(); }
    /* 아직 받는 중: WAIT 안에 도착하면 재생, 아니면 건너뜀(게임은 기다리지 않음) */
    it.waiting = true; want(it.k, true);
    var left = Math.max(0, WAIT - (Date.now() - it.t)), over = false;
    it.guard = setTimeout(function () { over = true; if (my !== gen || playing !== it) return; ST.skipTimeout++; playing = null; pump(); }, left);
    (waiters[it.k] = waiters[it.k] || []).push(function () {
      if (over) return;
      if (my !== gen || playing !== it) { ST.staleDropped++; return; }
      clearTimeout(it.guard); it.waiting = false;
      if (state[it.k] === 'ok') playItem(it, my); else { ST.skipFail++; playing = null; pump(); }
    });
  }
  VO.say = function (cast, ja) {
    if (!VO.on || !ja) return false;
    var k = VO.key(cast, ja); if (!K[k]) return false;
    VO.unlock(); if (!ctx) return false;
    if (window.AS && AS._S && AS._S() !== shiftRef) prefetchShift();
    want(k, true);
    q.push({ k: k, t: Date.now() });
    while (q.length > 2) q.shift(); /* 대기는 최근 2줄까지 */
    pump(); return true;
  };
  VO.stop = function () {
    gen++; q = []; if (playing) clearTimeout(playing.guard); if (playing && playing.src) { try { playing.src.stop(); } catch (e) {} } playing = null;
    if (!VO.on) {   /* 음성 끔: 아직 시작 안 한 요청은 취소. 근무 표시도 지워서 다시 켜면 다음 대사 때 이번 근무 미리 받기를 다시 시작(SPLIT-F01, GPT 19차 참고안) */
      shiftRef = null; fq.forEach(function (k) { if (state[k] === 'queued') state[k] = undefined; }); fq = []; return;
    }
    setTimeout(prefetchShift, 0);   /* 근무 시작·다음 승객: 게임 상태가 갱신된 뒤 */
  };
  VO.prefetch = prefetchShift;
  VO.whenIdle = function (cb, maxMs) {
    var t0 = Date.now();
    (function chk() { if ((!playing && !q.length) || !VO.on || Date.now() - t0 > (maxMs || 10000)) return cb(); setTimeout(chk, 150); })();
  };
  VO._st = function () { return { state: ctx && ctx.state, t: ctx && ctx.currentTime, playing: !!playing && !playing.waiting, waiting: !!(playing && playing.waiting), q: q.length, inflight: inflight, queued: fq.length }; };
  VO.busy = function () { return !!playing || q.length > 0; };
  VO.remote = true;
})();

/* game.js */
/* AIRLINE SAGA — 게임 본체 (Stage 01 체크인) (상태·화면·판정·리플레이)
   저장 키: acn-saga-v1 (사이트의 다른 기록과 분리) */
(function () {
  'use strict';
  var R = window.RULES, M = window.MISSION_CI01, DY = window.SAGA_DAYS, SP = window.SPRITES, LS = window.LESSONS, STG = window.STG, D = window.DIALOG.staff, VO = window.VO;
  var $ = function (s) { return document.querySelector(s); };
  var L = function (ja, ko, en) { return { ja: ja, ko: ko, en: en }; };
  var G = { lang: 'ja', country: 'JP', sound: true, hints: true, voice: true, screen: 'title', day: 1, hist: {} };
  function tx(o) { if (o == null) return ''; if (typeof o === 'string') return o; return o[G.lang] || o.ja || ''; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function save() { try { localStorage.setItem('acn-saga-v1', JSON.stringify({ lang: G.lang, country: G.country, sound: G.sound, hints: G.hints, voice: G.voice, best: G.best || {}, day: G.day, practice: !!G.practice, hintsByDay: G.hintsByDay || {} })); } catch (e) {} }
  function load() { try { var d = JSON.parse(localStorage.getItem('acn-saga-v1') || '{}'); ['lang', 'country', 'sound', 'hints', 'voice', 'best', 'day', 'practice', 'hintsByDay'].forEach(function (k) { if (d[k] != null) G[k] = d[k]; });
      if (!G.hintsByDay) G.hintsByDay = { 1: d.hints != null ? !!d.hints : true }; } catch (e) {} }
  /* 힌트는 날마다 따로: Day 1 기본 켬, Day 2부터 처음 선택 때 기본 끔(합의본 v3). 이용자가 그날 직접 바꾼 값은 유지 */
  function applyDayHints(n) { G.hintsByDay = G.hintsByDay || { 1: true }; G.hints = G.hintsByDay[n] != null ? !!G.hintsByDay[n] : n === 1; }
  function saveHist() { if (!G.store) return true; var ok = DY.saveStore(G.store); if (!ok && !G.saveWarned) { G.saveWarned = true; } return ok; }
  /* ---------- 소리 ---------- */
  var AC = null;
  function beep(f, d, type) { if (!G.sound) return; try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); var o = AC.createOscillator(), g = AC.createGain(); o.type = type || 'sine'; o.frequency.value = f; g.gain.value = .06; o.connect(g); g.connect(AC.destination); o.start(); g.gain.exponentialRampToValueAtTime(.0001, AC.currentTime + (d || .12)); o.stop(AC.currentTime + (d || .12)); } catch (e) {} }
  var sfx = { ok: function () { beep(880, .09); setTimeout(function () { beep(1320, .1); }, 90); }, ng: function () { beep(220, .25, 'square'); }, tap: function () { beep(660, .05); }, print: function () { for (var i = 0; i < 5; i++) setTimeout(function () { beep(300 + Math.random() * 80, .03, 'square'); }, i * 60); } };

  /* ---------- 공통 문구 ---------- */
  var T = {
    brandSub: L('Vela Air グランドスタッフ ― 教育用シミュレーション', 'Vela Air 그라운드 스태프 — 교육용 시뮬레이션', 'Vela Air ground staff — a training simulation'),
    lang: L('表示言語', '표시 언어', 'Language'), station: L('勤務地（業務ルール）', '근무지(업무 규칙)', 'Station (rules applied)'),
    jp: L('日本・成田（NRT）', '일본·나리타(NRT)', 'Japan · Narita (NRT)'), kr: L('韓国・仁川（ICN）', '한국·인천(ICN)', 'Korea · Incheon (ICN)'),
    stationNote: L('画面の言語と、適用する国の業務ルールは別々に選べます。', '화면 언어와 적용할 나라의 업무 규칙은 따로 고를 수 있습니다.', 'The screen language and the country whose rules apply are chosen separately.'),
    stages: L('ステージ ― 1便を動かす全部の仕事', '스테이지 — 한 편을 움직이는 모든 업무', 'Stages — every job behind one flight'),
    start: L('出勤する', '출근하기', 'Clock in'),
    days: L('チェックイン編 ― カウンターの5日間', '체크인편 — 카운터의 5일', 'Check-in — five days at the counter'),
    modeC: L('本番', '실전', 'Shift'), modeP: L('練習', '연습', 'Practice'),
    hints: L('コラドンのヒントを表示', '코라돈 힌트 표시', 'Show Koradon\'s tips'),
    sound: L('効果音', '효과음', 'Sound'),
    voice: L('音声（日本語）', '음성(일본어)', 'Voice (Japanese)'),
    credit: L('音声：Style-Bert-VITS2 ― 小春音アミ・あみたろ（あみたろの声素材工房 https://amitaro.net/）、つくよみちゃん（つくよみちゃんコーパス CV.夢前黎）、Lux（CC BY 4.0）、zonoko（CC0）、JVNV F1・F2・M1・M2（JVNVコーパス CC BY-SA 4.0）', '음성: Style-Bert-VITS2 — 小春音アミ·あみたろ(あみたろの声素材工房 https://amitaro.net/), つくよみちゃん(つくよみちゃんコーパス CV.夢前黎), Lux(CC BY 4.0), zonoko(CC0), JVNV F1·F2·M1·M2(JVNV 코퍼스 CC BY-SA 4.0)', 'Voices: Style-Bert-VITS2 — Koharune Ami and Amitaro (Amitaro voice materials, https://amitaro.net/), Tsukuyomi-chan (Tsukuyomi-chan corpus, CV. Rei Yumesaki), Lux (CC BY 4.0), zonoko (CC0), JVNV F1/F2/M1/M2 (JVNV corpus, CC BY-SA 4.0)'),
    edu: L('登場する航空会社・便・お客様・規定の数値は教育用の架空のものです。実際の規定は自社マニュアルと公的情報で確認してください。', '등장하는 항공사·항공편·승객·규정 수치는 교육용 가상 데이터입니다. 실제 규정은 자사 매뉴얼과 공적 정보로 확인하세요.', 'The airline, flights, passengers and rule values are fictional, for training. Always check real rules in your company manual and official sources.'),
    flight: L('便', '편', 'Flight'), now: L('現在', '현재', 'Now'), close: L('締切まで', '마감까지', 'To close'), queue: L('待ち', '대기', 'Queue'), served: L('完了', '완료', 'Done'),
    min: L('分', '분', 'min'), next: L('次のお客様どうぞ', '다음 손님 오세요', 'Next, please'),
    tabs: { pnr: L('予約', '예약', 'Booking'), pp: L('旅券', '여권', 'Passport'), entry: L('渡航条件', '입국 조건', 'Entry'), seat: L('座席', '좌석', 'Seat'), bag: L('手荷物', '수하물', 'Bags'), bp: L('搭乗券', '탑승권', 'Boarding pass'), sup: L('サポート', '지원', 'Assistance') },
    you: L('あなた', '나', 'You'), mentor: L('コラドン', '코라돈', 'Koradon'), rule: L('コラリンのルール', '코라린의 규칙', 'Korarin\'s rule'),
    eduData: L('教育用データ ― 実務では Timatic や公的情報で照合します', '교육용 데이터 — 실무에서는 Timatic과 공적 정보로 확인합니다', 'Training data — in real work, check Timatic and official sources'),
    ok: L('OK', '이상 없음', 'OK'), ng: L('問題あり', '문제 있음', 'Problem')
  };

  /* ---------- 스테이지 (모든 업무 영역, ★ = 계산 실습 스테이지) ---------- */
  var STAGES = [
    { n: '01', nm: L('チェックイン', '체크인', 'Check-in'), st: 'play', d: 'D01' },
    { n: '02', nm: L('ゲート・搭乗', '게이트·탑승', 'Gate & boarding'), d: 'D01' },
    { n: '03', nm: L('ロードコントロール（W&B）', '탑재관리(W&B)', 'Load control (W&B)'), key: 1, d: 'D03' },
    { n: '04', nm: L('ランプ・ターンアラウンド', '램프·턴어라운드', 'Ramp & turnaround'), d: 'D04' },
    { n: '05', nm: L('運航管理（ディスパッチ）', '운항관리(디스패치)', 'Flight dispatch'), key: 1, d: 'D06' },
    { n: '06', nm: L('イレギュラー対応', '비정상 운항 대응', 'Irregular operations'), d: 'D02' },
    { n: '07', nm: L('CIQ・出入国', 'CIQ·출입국', 'CIQ & borders'), d: 'D08' },
    { n: '08', nm: L('航空貨物', '항공화물', 'Air cargo'), d: 'D05' },
    { n: '09', nm: L('整備・MEL・AOG', '정비·MEL·AOG', 'Maintenance, MEL, AOG'), d: 'D07' },
    { n: '10', nm: L('営業・販売', '영업·판매', 'Sales'), d: 'D09' },
    { n: '11', nm: L('収益管理・運賃', '수익관리·운임', 'Revenue & fares'), d: 'D10' },
    { n: '12', nm: L('精算・財務', '정산·재무', 'Settlement & finance'), d: 'D11' },
    { n: '13', nm: L('人事・総務', '인사·총무', 'HR & admin'), d: 'D12' },
    { n: '14', nm: L('契約・ハンドリング会社管理', '계약·조업사 관리', 'Contracts & handling agents'), d: 'D13' },
    { n: '15', nm: L('安全・保安・監査', '안전·보안·감사', 'Safety, security, audits'), d: 'D14' },
    { n: '16', nm: L('当局対応・許認可', '당국 대응·인허가', 'Authorities & permits'), d: 'D16' },
    { n: '17', nm: L('支店経営（月次・年次）', '지점 경영(월간·연간)', 'Running the station'), d: 'D15' },
    { n: '18', nm: L('新規就航プロジェクト', '신규 취항 프로젝트', 'Launching a new route'), d: 'D15' }
  ];

  /* ---------- 미션 상태 ---------- */
  var V, S;
  function hm(t) { var h = Math.floor(t / 60), m = Math.floor(t % 60); return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m; }
  function pm(s) { var p = s.split(':'); return +p[0] * 60 + +p[1]; }
  function curDay() { var d = DY.list[(G.day || 1) - 1]; return d && d.mission && DY.status(G.hist, d.n, G.country, G.practice) === 'open' ? d : DY.list[0]; }
  function newMission() {
    var dd = curDay(); G.day = dd.n; M = dd.mission; applyDayHints(dd.n);
    V = M.variants[G.country];
    var seed = M.generated ? (window.SAGA_SEED || (Date.now() % 2147483647)) : 0;
    S = { clock: pm(V.start), close: pm(V.close), bgQueue: 9, list: M.generated ? V.pax(seed) : V.pax(), seed: seed, adv: true,   /* 25차(사용자 10-14): Day 1도 Day 2 이후와 같은 기능(사진 대조·다시 확인·SV·발급일·기내 반입 계량·7항목 채점). 힌트 상한만 Day 2부터 */ idx: -1, cur: null, results: [], revenue: [], seats: M.aircraft.taken.slice(), infantSeats: M.aircraft.infantSeats.slice(), strikes: 0, seq: 41, day: dd, ac: M.aircraft, evChecks: [], evRep: { need: 0, done: 0 } };
  }
  function addTime(m) {
    S.clock += m; S.bgQueue = Math.max(2, S.bgQueue + (Math.random() < m / 4 ? 1 : 0) - (Math.random() < m / 5 ? 1 : 0));
    if (S.cur) S.cur.mins += m;
    updateBar();
  }
  function note(type, text, lesson, code) { S.cur.notes.push({ t: type, x: text, l: lesson, c: code }); }
  /* 승객의 문제: p.issues(여러 개) 또는 p.issue(하나) */
  function has(p, k) { return p.issues ? p.issues.indexOf(k) >= 0 : p.issue === k; }
  function noteText(n) { return typeof n.x === 'function' ? n.x() : n.x && typeof n.x === 'object' ? tx(n.x) : n.x; }   /* 26차: 이어하기로 되살린 노트는 {ja,ko,en} */
  function mood(d) { S.cur.mood = Math.max(0, Math.min(100, S.cur.mood + d)); drawPax(); }

  /* 최고 성적(INT-F03): 같은 회차의 등급·점수, ✔ = 그 회차가 안전 합격. 회차를 알 수 없는 예전 집계는 따로 표시 */
  function legacyText(a) { return tx(L('以前の集計 ', '이전 집계 ', 'Earlier totals ')) + tx(L('最高ランク ', '최고 등급 ', 'best rank ')) + (a.bestRank || '—') + ' / ' + tx(L('最高点 ', '최고 점수 ', 'best score ')) + a.best; }
  function bestText(r, dn) {
    if (!r) return '';
    if (!r.top) return r.plays ? legacyText(r) : '';
    var t = r.top, s = t.rank + ' · ' + t.tot + (t.safe ? ' · ✔' : '') + (t.hints ? ' · ' + tx(L('ヒント', '힌트', 'tips')) : '') + (t.complete === false ? ' · ' + tx(L('未完了', '미완료', 'unfinished')) : '');
    /* 25차b(GPT 25-R01): 새 판으로 아직 하지 않은 Day 1 기록(채점 버전 표시 없음)은 예전 3항목 채점 — 처음 화면에서도 구분 */
    if (dn === 1 && !t.scoreVer) s += ' (' + tx(L('以前の採点', '이전 채점', 'earlier scoring')) + ')';
    var a = r.legacyAgg;
    if (a && (RANKV0[a.bestRank] || 0) * 1000 + a.best > (RANKV0[t.rank] || 0) * 1000 + t.tot) s += ' (' + legacyText(a) + ')';
    /* 25차: 예전 채점(Day 1의 3항목)으로 받은 최고 기록은 따로 표시 — 새 채점과 섞어 비교하지 않음 */
    var pt = r.prevTop && r.prevTop.basic3;
    if (pt) s += ' (' + tx(L('以前の採点 ', '이전 채점 ', 'earlier scoring ')) + pt.rank + ' · ' + pt.tot + (pt.safe ? ' · ✔' : '') + ')';
    return s;
  }
  var RANKV0 = { S: 4, A: 3, B: 2, C: 1 };
  /* 27차: 체크인편 클리어 = 실전(연습 기록 아님) DAY 5를 B 이상·안전 합격·전원 처리로 마침(DAY 4→5 해금과 같은 기준). 근무지별 */
  function ciCleared(country) { var d5 = DY.list[4]; return !!(d5 && DY.cleared(DY.rec(G.hist, d5, country || G.country))); }
  function stageOpen(n) { if (n === '01') return true; if (n === '02') return ciCleared(); return false; }
  /* ================= 26차: 근무 도중 이어하기(승객 단위 저장) — 설계 v2(GPT R25-01~07) =================
     저장 시점(R25-01): nextPax()에서 「끝난 승객을 결과에 넣고 S.cur를 비운 직후」, 이벤트 판단·다음 승객 호출 전.
       → 결과 확정 → 완료 인원(results.length)·다음 순서(idx+1) 확정 → 저장 → 이벤트/다음 승객. 이벤트를 마치면 다시 nextPax()를 부르므로 이벤트 완료 상태도 저장됨.
       → 복원하면 같은 nextPax()를 다시 부름. S.cur가 비어 있으므로 같은 결과를 두 번 넣지 않음.
     저장 키: acn-saga-run-v1(한 개). 학습 기록(acn-saga-hist-v2)·설정(acn-saga-v1)과 따로. 자동 삭제 없음(사용자 결정 10-14). */
  var RKEY = 'acn-saga-run-v1';
  var RUNVER = { schema: 2, rules: '28.0' };   /* rules: 판정 코드(game.js의 판단·채점 함수)가 바뀌면 올림. 판정 데이터(승객·미션·RULES)는 지문으로 자동 감지(27차 GPT 26-F02) */
  /* 저장하는 S 필드(R25-05: 전체 S를 그대로 쓰지 않음). 함수·DOM·음성·열린 창 콜백은 넣지 않음 */
  var RUNF = ['clock', 'close', 'bgQueue', 'idx', 'results', 'revenue', 'seats', 'infantSeats', 'strikes', 'seq', 'evChecks', 'evRep', 'manual', 'manList', 'manTag', 'recovered', 'ob', 'lateDone', 'lateAt', 'safety', 'evRec', 'e1', 'e2', 'e3', 'delay', 'delayVague'];
  /* 저장하지 않는 S 필드: 판 정보(따로 저장)·화면 상태·결과 화면 전용 */
  var RUNSKIP = ['list', 'cur', 'seed', 'adv', 'day', 'ac', 'runId', 'rev', 'fp', 'startedAt', 'modalRedraw', 'bub', 'guideL', 'leaving', 'leaveGo', 'hrec', 'saveOk', 'mistakes', '_t', 'dlChecked', 'noSave', 'runWarn', 'resumed', 'dupRun', 'lastSave', 'testStopped', 'resumeAt', 'tabTok', 'takeover', 'writeFail', 'blocked', 'ownerLost', 'badState'];
  function fnv(s) { var h = 0x811c9dc5; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return ('0000000' + h.toString(16)).slice(-8); }
  function freshList(mi, va, seed) { return mi.generated ? va.pax(seed) : va.pax(); }
  /* 시나리오 지문(R25-04): 승객 순서·문제 유형·짐 무게·여권 기한·예약번호·사전 배정 좌석. 대사 글자는 넣지 않음(문구만 고쳐도 이어하기 유지) */
  /* 27차(GPT 26-F02): 판정에 쓰이는 데이터 전체의 지문. 표시용(대사 say·3언어 글자 {ja,ko,en}·그림 art/look·목소리)은 빼고
     승객(원본 생성값 전체)·미션 조건(편·시각·마감·배치·이벤트·요금 등)·업무 규칙(RULES)을 넣음 → 문구·음성·CSS만 바뀐 판은 호환, 판단 데이터가 바뀌면 차단 */
  var FP_SKIP = ['say', 'look', 'art', 'voice', 'prop', 'carryProp', 'variants', 'build', 'lessons', 'pax', 'nm', 'learn', 'module', 'level'];
  function isText(o) { var k = Object.keys(o); return k.length > 0 && k.every(function (x) { return (x === 'ja' || x === 'ko' || x === 'en') && typeof o[x] === 'string'; }); }
  function canon(v, d) {
    if ((d || 0) > 12) return null;
    if (typeof v === 'function' || v === undefined) return undefined;
    if (v === null || typeof v !== 'object') return v;
    if (Array.isArray(v)) return v.map(function (x) { var c = canon(x, (d || 0) + 1); return c === undefined ? null : c; });
    if (isText(v)) return undefined;
    var o = {}; Object.keys(v).sort().forEach(function (k) { if (FP_SKIP.indexOf(k) >= 0) return; var c = canon(v[k], (d || 0) + 1); if (c !== undefined) o[k] = c; }); return o;
  }
  function scenFp(mi, list, va) {
    var ps = allPax(list).map(function (p) { return canon(p); });
    return fnv(JSON.stringify({ m: canon(mi), v: canon(va || V), late: list.late ? list.late.id : null, pax: ps }));
  }
  function rulesFp() { return fnv(JSON.stringify(canon(R))); }
  function newRunId() { return 'r' + Date.now().toString(36) + '-' + Math.floor(Math.random() * 1e9).toString(36); }
  function readRun() {
    var raw = null; try { raw = localStorage.getItem(RKEY); } catch (e) { return { err: 'storage' }; }
    if (!raw) return null;
    var o = null; try { o = JSON.parse(raw); } catch (e) { return { err: 'json' }; }
    if (!o || typeof o !== 'object') return { err: 'json' };
    return o;
  }
  function clearRunNow(runId, owner) { try { var o = readRun(); if (!o || o.err || !runId || (o.runId === runId && (!owner || o.owner === owner))) localStorage.removeItem(RKEY); } catch (e) {} }   /* 27차: owner가 있으면 그 탭의 저장본일 때만. 잠금 안에서 부름 */
  function clearRun(runId, owner) { return storeOp(function () { clearRunNow(runId, owner); }); }
  /* 28차(GPT 27-F01): 진행본·학습 기록을 바꾸는 모든 쓰기(저장·이어받기·완료 기록·삭제·새 판)를 같은 이름의 배타 잠금(Web Locks) 안에서 한다.
     같은 저장 영역의 다른 탭도 같은 잠금을 쓰므로 「다시 읽기 → 확인 → 쓰기」 사이에 다른 탭의 쓰기가 끼어들 수 없다.
     잠금 안의 작업은 동기 함수 하나(중간에 await 없음). 같은 탭의 요청은 요청 순서대로 실행된다.
     Web Locks가 없는 브라우저는 바로 실행(예전 방식: 소유 표시·다시 읽기) — 탭 사이의 완전한 보장은 없으므로 충돌 안내에 그 제한을 함께 적는다. */
  var LOCKN = 'acn-saga-store', storeQ = Promise.resolve();
  function hasLocks() { try { return !(window.SAGA_TEST && window.__sagaNoLocks) && !!(navigator.locks && typeof navigator.locks.request === 'function'); } catch (e) { return false; } }
  function storeOp(fn) {
    var p;
    if (hasLocks()) p = navigator.locks.request(LOCKN, function () { return fn(); });
    else p = new Promise(function (res) { res(fn()); });
    storeQ = storeQ.then(function () { return p; }).then(null, function () {});
    return p;
  }
  function flushStore() { return storeQ.then(function () { return storeOp(function () {}); }).then(function () {}, function () {}); }   /* 시험용: 이 탭과 (같은 잠금을 먼저 요청한) 다른 탭의 쓰기가 끝날 때까지 */
  /* 노트 3언어(R25-06): 화면 언어를 잠깐 바꿔 함수를 부르고 반드시 되돌림. DOM·음성·설정 저장은 건드리지 않음 */
  function three(fn) {
    var keep = G.lang, out = {};
    try { ['ja', 'ko', 'en'].forEach(function (l) { G.lang = l; try { out[l] = String(fn()); } catch (e) { out[l] = ''; } }); }
    finally { G.lang = keep; }
    return out;
  }
  /* 참조 바꾸기: 승객 객체 → {__pax:id}, 다른 결과 객체 → {__res:번호}, 노트 함수 → {__t:{ja,ko,en}}. 그 밖의 함수는 빼고 기록(drop) */
  function encRun(v, ctx, path, depth) {
    if (depth > 14) throw new Error('depth ' + path);
    if (typeof v === 'function') { ctx.drop.push(path); return undefined; }
    if (v === null || typeof v !== 'object') return typeof v === 'number' && !isFinite(v) ? null : v;
    var pi = ctx.pax.indexOf(v); if (pi >= 0) return { __pax: ctx.pax[pi].id };
    var ri = ctx.res.indexOf(v); if (ri >= 0 && v !== ctx.self) return { __res: ri };
    if (Array.isArray(v)) return v.map(function (x, i) { var e = encRun(x, ctx, path + '[' + i + ']', depth + 1); return e === undefined ? null : e; });
    var o = {};
    Object.keys(v).forEach(function (k) {
      if (k === 'x' && typeof v[k] === 'function' && 't' in v) { o.x = { __t: three(v[k]) }; return; }
      var e = encRun(v[k], ctx, path + '.' + k, depth + 1); if (e !== undefined) o[k] = e;
    });
    return o;
  }
  function decRun(v, ctx) {
    if (v === null || typeof v !== 'object') return v;
    if (Array.isArray(v)) return v.map(function (x) { return decRun(x, ctx); });
    if ('__pax' in v) { var p = ctx.byId[v.__pax]; if (!p) throw new Error('pax ' + v.__pax); return p; }
    if ('__res' in v) { var r = ctx.res[v.__res]; if (!r) throw new Error('res ' + v.__res); return r; }
    if ('__t' in v) return { ja: String(v.__t.ja || ''), ko: String(v.__t.ko || ''), en: String(v.__t.en || '') };
    var o = {}; Object.keys(v).forEach(function (k) { o[k] = decRun(v[k], ctx); }); return o;
  }
  function allPax(list) { return list.concat(list.late ? [list.late] : []); }
  /* 다음에 할 일(cursor.nextPhase): nextPax()와 같은 조건 */
  function runPhase() {
    if (S.adv && M.events && S.clock < S.close) {
      if (S.results.length === M.events.swapAfter && !S.e1) return 'swap';
      if (S.results.length === M.events.recoverAfter && S.manual && !S.recovered) return 'recovery';
      if (M.events.delayAtStart && !S.delay) return 'delay';
      if (S.results.length === M.events.overbookAfter && !S.ob) return 'overbook';
    }
    if (M.events && M.events.lateAtEnd && !S.lateDone && (S.idx + 1 >= S.list.length || S.clock >= S.close)) return 'late';
    if (S.idx + 1 >= S.list.length || S.clock >= S.close) return 'finish';
    return 'pax';
  }
  /* 체크포인트 저장 — 쓰기 실패·다른 창 충돌이면 게임은 계속하고 한 번만 안내(R25-07) */
  /* 28차: 저장 = ① 지금 상태를 바로 직렬화(그 순간의 체크포인트) → ② 잠금 안에서 소유권 확인·쓰기 */
  function saveRun() {
    if (!S || S.noSave || !S.runId) return Promise.resolve(false);
    var me = S, o2;
    try { o2 = runSnap(); } catch (e) { S.writeFail = true; runWarn('write'); return Promise.resolve(false); }
    /* 28차(GPT 27-F02): 범위 밖 값이 생긴 상태는 진행본으로 쓰지 않음(마지막 정상 체크포인트를 남김) */
    var why = null; try { why = stateWhy(JSON.parse(JSON.stringify(o2.s)), M, o2.paxIds) || patchWhy(o2.passengerPatches); } catch (e) { why = 'format'; }
    if (why) { S.writeFail = true; S.badState = why; runWarn('write'); return Promise.resolve(false); }
    return storeOp(function () { return writeRun(me, o2); });
  }
  function writeRun(me, o2) {
    if (me.noSave) return false;
    var o = readRun();
    /* 27차(GPT 26-F01)·28·29차: 소유권 = 같은 runId·같은 rev·같은 소유 탭(owner). 이어하기는 잠금 안에서 최신 저장본으로 되살린 뒤 소유를 넘겨받음(prepResume). 저장소가 비었는데 이미 저장한 적이 있으면 다른 탭이 끝냈거나 지운 것 */
    var mine = o && !o.err && o.runId === me.runId && (o.rev || 0) === (me.rev || 0) && o.owner === me.tabTok;
    if (!(mine || (!o && !(me.rev > 0)))) { me.noSave = 'conflict'; if (S === me) runWarn('conflict'); return false; }
    try {
      var rev = (me.rev || 0) + 1; o2.rev = rev; o2.savedAt = new Date().toISOString();
      var js = JSON.stringify(o2); o2.meta.bytes = js.length; js = JSON.stringify(o2);
      if (window.SAGA_TEST && window.__sagaFailWrite) throw new Error('test-fail');
      localStorage.setItem(RKEY, js);
      me.rev = rev; me.lastSave = o2.meta; me.takeover = false; me.writeFail = false;
      if (S === me && !me.runWarn && me.resumeAt != null && me.results.length > me.resumeAt) { var rn = $('#runnote'); if (rn) rn.hidden = true; me.resumeAt = null; }   /* 이어하기 안내는 다음 승객을 마치면 닫음 */
      return true;
    } catch (e) { me.writeFail = true; if (S === me) runWarn('write'); return false; }   /* 쓰기 실패는 충돌과 구분: 다음 경계에서 다시 시도 */
  }
  function runSnap() {
    /* 지금 상태(승객 patch·결과·이벤트 상태)를 저장 형식으로 — 실패하면 예외(saveRun에서 쓰기 실패로 처리) */
    {
      var fresh = freshList(M, V, S.seed), fb = {}; allPax(fresh).forEach(function (p) { fb[p.id] = p; });
      var patches = {};
      allPax(S.list).forEach(function (p) { var f = fb[p.id], d = {}; if (!f) return; Object.keys(p).concat(Object.keys(f)).forEach(function (k) { if (k in d) return; var a = JSON.stringify(p[k]), b = JSON.stringify(f[k]); if (a !== b) d[k] = p[k] === undefined ? { __del: 1 } : JSON.parse(a === undefined ? 'null' : a); }); if (Object.keys(d).length) patches[p.id] = d; });
      var ctx = { pax: allPax(S.list), res: S.results.slice(), drop: [], self: null }, st = {};
      RUNF.forEach(function (k) {
        if (!(k in S)) return;
        if (k === 'results') { st.results = S.results.map(function (r, i) { ctx.self = r; var e = encRun(r, ctx, 'results[' + i + ']', 0); ctx.self = null; return e; }); return; }
        var e = encRun(S[k], ctx, k, 0); if (e !== undefined) st[k] = e;
      });
      var unknown = Object.keys(S).filter(function (k) { return RUNF.indexOf(k) < 0 && RUNSKIP.indexOf(k) < 0; });
      var o2 = { schema: RUNVER.schema, runId: S.runId, rev: 0, savedAt: '', startedAt: S.startedAt,
        versions: { schema: RUNVER.schema, rules: RUNVER.rules, rulesData: rulesFp(), scenario: S.fp, mission: M.id }, owner: S.tabTok,
        day: S.day.n, country: G.country, practice: !!G.practice, hints: !!G.hints, seed: S.seed, ac: S.ac === M.layoutB ? 'B' : 'A',
        cursor: { completedPaxCount: S.results.length, nextPaxIndex: S.idx + 1, total: S.list.length, nextPhase: runPhase() },
        paxIds: S.list.map(function (p) { return p.id; }), lateId: S.list.late ? S.list.late.id : null, passengerPatches: patches, s: st,
        meta: { dropped: ctx.drop.slice(0, 20), unknownKeys: unknown } };
      return JSON.parse(JSON.stringify(o2));   /* 이 순간의 내용으로 고정 */
    }
  }
  function runWarn(kind) {
    if (!S || S.runWarn === kind || S.runWarn === 'conflict') return; S.runWarn = kind;
    var t = kind === 'conflict' ? (hasLocks() ? L('この勤務は別の画面（タブ）で続けられています。この画面の進み具合は保存されません。', '이 근무는 다른 화면(탭)에서 이어서 진행되었습니다. 이 화면의 진행은 저장되지 않습니다.', 'This shift is being continued in another window or tab. Progress here will not be saved.')
        : L('この勤務は別の画面（タブ）で続けられています。この画面の進み具合は保存されません。このブラウザは画面どうしの保存の調整に対応していないため、同じ勤務を複数の画面で同時に進めないでください。', '이 근무는 다른 화면(탭)에서 이어서 진행되었습니다. 이 화면의 진행은 저장되지 않습니다. 이 브라우저는 화면 사이의 저장 조정을 지원하지 않으므로 같은 근무를 여러 화면에서 동시에 진행하지 마세요.', 'This shift is being continued in another window or tab. Progress here will not be saved. This browser cannot coordinate saving between tabs, so do not play the same shift in several tabs at once.'))
      : L('この端末に勤務の途中経過を保存できませんでした（勤務はそのまま続けられます）。', '이 기기에 근무 진행을 저장하지 못했습니다(근무는 그대로 계속할 수 있습니다).', 'Could not save your shift progress on this device (you can keep playing).');
    var el = $('#runnote'); if (el) { el.textContent = tx(t); el.hidden = false; }
  }
  /* 저장본 점검(R25-04·05): 형식·범위·승객 대조. 실패 이유를 돌려줌(null = 이어하기 가능) */
  function checkRun(o) {
    if (!o) return 'none'; if (o.err) return o.err;
    function num(x, lo, hi) { return typeof x === 'number' && isFinite(x) && x >= lo && x <= hi; }
    if (o.schema !== RUNVER.schema || !o.versions || o.versions.schema !== RUNVER.schema) return 'schema';
    if (o.versions.rules !== RUNVER.rules || o.versions.rulesData !== rulesFp()) return 'rules';
    if (typeof o.runId !== 'string' || !num(o.rev, 1, 1e9)) return 'format';
    var d = DY.list[o.day - 1]; if (!num(o.day, 1, DY.list.length) || !d || !d.mission) return 'format';
    if (['JP', 'KR'].indexOf(o.country) < 0 || !num(o.seed, 0, 2147483647) || ['A', 'B'].indexOf(o.ac) < 0) return 'format';
    var mi = d.mission, va = mi.variants[o.country], fresh; try { fresh = freshList(mi, va, o.seed); } catch (e) { return 'scenario'; }
    if (o.versions.mission !== mi.id || o.versions.scenario !== scenFp(mi, fresh, va)) return 'scenario';
    if (!Array.isArray(o.paxIds) || o.paxIds.join('|') !== fresh.map(function (p) { return p.id; }).join('|')) return 'scenario';
    if ((o.lateId || null) !== (fresh.late ? fresh.late.id : null)) return 'scenario';
    var s = o.s, c = o.cursor; if (!s || !c || !Array.isArray(s.results)) return 'format';
    var sw; try { sw = stateWhy(JSON.parse(JSON.stringify(s)), mi, o.paxIds) || patchWhy(o.passengerPatches); } catch (e) { sw = 'format'; } if (sw) return 'state';
    if (!num(c.completedPaxCount, 0, fresh.length) || c.completedPaxCount !== s.results.length || !num(s.idx, -1, fresh.length - 1) || c.nextPaxIndex !== s.idx + 1 || s.results.length !== s.idx + 1) return 'range';
    if (!num(s.clock, pm(va.start), pm(va.start) + 600) || !num(s.seq, 0, 9999) || !num(s.strikes, 0, 999)) return 'range';
    if (!Array.isArray(s.seats) || s.seats.some(function (x) { return typeof x !== 'string' || !/^\d{1,2}[A-K]$/.test(x); })) return 'range';
    /* 결과의 승객은 순서대로 승객 목록과 같아야 함, 좌석은 처리된 승객끼리 겹치지 않음(복구 전 수기 충돌 사례 제외) */
    var seen = {}, bad = false;
    s.results.forEach(function (r, i) { if (!r || !r.p || r.p.__pax !== o.paxIds[i]) bad = true; if (r && r.seat && !r.denied && !r.vol) { if (seen[r.seat] && !(s.e3 && s.e3.conflict)) bad = true; seen[r.seat] = 1; } });
    if (bad) return 'pax';
    return null;
  }
  /* 27차(GPT 26-F03): 저장본 상태 점검 — 필수 필드·타입·중첩 구조·조건부 필드(그 날의 이벤트를 지났으면 그 상태가 있어야 함). 실패하면 이어하기를 막고 기록·저장본은 건드리지 않음 */
  /* 28차(GPT 27-F02): 저장본 안의 모든 숫자는 유한하고 상식적인 크기(|x| ≤ 1e7)여야 함 — 처음 보는 칸도 빠지지 않게 */
  function numWalk(v, path, d) {
    path = path || 's'; d = d || 0; if (d > 16) return path;
    if (typeof v === 'number') return (!isFinite(v) || Math.abs(v) > 1e7) ? path : null;
    if (!v || typeof v !== 'object') return null;
    var ks = Object.keys(v); for (var i = 0; i < ks.length; i++) { var w = numWalk(v[ks[i]], path + '.' + ks[i], d + 1); if (w) return w; }
    return null;
  }
  /* 승객 patch(이름 정정·짐 추가 등)의 숫자 범위: 짐 무게·기내 반입 0~100kg, 그 밖의 숫자도 numWalk */
  function patchWhy(pp) {
    if (pp == null) return null; if (typeof pp !== 'object' || Array.isArray(pp)) return 'patch';
    var w = numWalk(pp, 'patch'); if (w) return w;
    var bad = null;
    Object.keys(pp).forEach(function (id) { var d = pp[id]; if (!d || typeof d !== 'object') { bad = 'patch'; return; }
      if (d.carry != null && !(typeof d.carry === 'number' && d.carry >= 0 && d.carry <= 100)) bad = 'patch:carry';
      if (d.bags != null && !(Array.isArray(d.bags) && d.bags.length <= 20 && d.bags.every(function (b) { return b && typeof b === 'object' && (b.kg == null || (typeof b.kg === 'number' && b.kg >= 0 && b.kg <= 100)); }))) bad = 'patch:bags'; });
    return bad;
  }
  function stateWhy(st, mi, paxIds) {
    function num(x) { return typeof x === 'number' && isFinite(x); }
    function int(x, lo) { return num(x) && Math.floor(x) === x && x >= (lo == null ? 0 : lo); }
    function obj(x) { return !!x && typeof x === 'object' && !Array.isArray(x); }
    function str(x) { return typeof x === 'string'; }
    function ref(x, kind) { return obj(x) && (kind in x); }
    function txt(x) { return str(x) || (obj(x) && obj(x.__t) && str(x.__t.ja) && str(x.__t.ko) && str(x.__t.en)) || (obj(x) && str(x.ja) && str(x.ko) && str(x.en)); }
    function seatOk(x) { return str(x) && /^\d{1,2}[A-K]$/.test(x) && +x.slice(0, -1) >= 1 && +x.slice(0, -1) <= 60; }
    function rng(x, lo, hi) { return num(x) && x >= lo && x <= hi; }   /* 28차(GPT 27-F02): 숫자는 타입만이 아니라 업무상 유효 범위까지 */
    function noteOk(n) { return obj(n) && ['good', 'bad', 'info'].indexOf(n.t) >= 0 && txt(n.x) && (n.l == null || str(n.l)) && (n.c == null || str(n.c)); }
    function resOk(r, ev) {
      if (!obj(r) || !obj(r.p) || !Array.isArray(r.notes) || r.notes.length > 200 || !r.notes.every(noteOk) || !rng(r.mood, 0, 100) || !rng(r.mins, 0, 240)) return false;
      if (!Array.isArray(r.selfFix) || !obj(r.acts)) return false;
      if (ev) return true;
      if (!ref(r.p, '__pax') && !str(r.p.id)) return false;
      if (!obj(r.chk) || !obj(r.flags) || !obj(r.fixTry) || !obj(r.sup) || !Array.isArray(r.bags)) return false;
      if (r.bags.length > 20 || !r.bags.every(function (b) { return obj(b) && (b.w === null || rng(b.w, 0, 100)) && (b.tag === null || b.tag === undefined || str(b.tag)); })) return false;
      if (r.carryW != null && !rng(r.carryW, 0, 100)) return false;
      if (r.seat != null && !seatOk(r.seat) && !r.vol) return false;
      return true;
    }
    if (!obj(st)) return 'format';
    var need = ['clock', 'close', 'bgQueue', 'idx', 'results', 'revenue', 'seats', 'infantSeats', 'strikes', 'seq', 'evChecks', 'evRep'];
    for (var i = 0; i < need.length; i++) if (!(need[i] in st) || st[need[i]] == null) return 'missing:' + need[i];
    if (!num(st.clock) || !num(st.close) || !num(st.bgQueue) || !int(st.idx, -1) || !int(st.strikes) || !int(st.seq)) return 'type';
    if (!rng(st.clock, 0, 2880) || !rng(st.close, 0, 2880) || !rng(st.bgQueue, 0, 500) || st.strikes > 200 || st.seq > 9999) return 'range';
    var wild = numWalk(st); if (wild) return 'range:' + wild;
    if (!Array.isArray(st.results) || !st.results.every(function (r, k) { return resOk(r) && (!paxIds || !r.p.__pax || r.p.__pax === paxIds[k]); })) return 'results';
    if (!Array.isArray(st.revenue) || st.revenue.length > 200 || !st.revenue.every(function (x) { return obj(x) && str(x.pax) && str(x.what) && int(x.amt) && x.amt <= 5000000 && (x.cur === 'JPY' || x.cur === 'KRW'); })) return 'revenue';
    if (!Array.isArray(st.seats) || st.seats.length > 400 || !st.seats.every(seatOk) || !Array.isArray(st.infantSeats) || !st.infantSeats.every(seatOk)) return 'seats';
    if (!Array.isArray(st.evChecks) || !st.evChecks.every(function (x) { return obj(x) && str(x.id) && typeof x.ok === 'boolean'; })) return 'evChecks';
    if (!obj(st.evRep) || !int(st.evRep.need) || !int(st.evRep.done) || st.evRep.done > st.evRep.need || st.evRep.need > 200) return 'evRep';
    if (st.safety != null && (!Array.isArray(st.safety) || !st.safety.every(function (x) { return obj(x) && str(x.who); }))) return 'safety';
    if (st.evRec != null && !resOk(st.evRec, true)) return 'evRec';
    if (st.manList != null && (!Array.isArray(st.manList) || !st.manList.every(function (x) { return ref(x, '__res') || obj(x); }))) return 'manList';
    if (st.delay != null && !(obj(st.delay) && str(st.delay.etd))) return 'delay';
    if (st.ob != null && !(obj(st.ob) && obj(st.ob.asked) && obj(st.ob.resp))) return 'ob';
    if (st.e1 != null && !(obj(st.e1) && Array.isArray(st.e1.rows) && st.e1.rows.every(function (x) { return obj(x) && (ref(x.r, '__res') || obj(x.r)) && seatOk(x.cur) && seatOk(x.old); }))) return 'e1';
    if (st.e3 != null && !(obj(st.e3) && Array.isArray(st.e3.list))) return 'e3';
    ['manual', 'recovered', 'lateDone', 'delayVague'].forEach(function (k) { if (st[k] != null && typeof st[k] !== 'boolean') st.__bad = k; }); if (st.__bad) return 'type';
    if (st.lateAt != null && !rng(st.lateAt, 0, 2880)) return 'type';
    /* 조건부: 이벤트 시점을 지났으면 그 이벤트의 상태가 있어야 함 */
    var ev = mi.events || {}, n = st.results.length;
    if (ev.swapAfter && n > ev.swapAfter && !(st.e1 && st.e1.done)) return 'event:swap';
    if (ev.delayAtStart && n >= 1 && !st.delay) return 'event:delay';
    if (ev.overbookAfter && n > ev.overbookAfter && !st.ob) return 'event:overbook';
    if (ev.recoverAfter && n > ev.recoverAfter && st.manual && !st.recovered) return 'event:recovery';
    return null;
  }
  function stateBad(ns, mi) { try { return !!stateWhy(ns, mi, null); } catch (e) { return true; } }
  /* 29차(GPT 28-F01): 이어하기 = 잠금을 받은 뒤 최신 저장본을 다시 읽어 검사 → 그 저장본으로 상태를 되살리고 → 같은 잠금 안에서 소유권 넘겨받기를 확정 → 성공한 뒤에만 근무 화면 시작.
     타이틀에 보이던 저장본보다 다른 탭이 더 진행해 두었으면 그 최신 체크포인트에서 시작한다(과거 상태로 열지 않음). 이미 끝났거나 지워진 판은 되살리지 않는다. */
  /* 30차(GPT 29-F01): 이어하기 요청에 번호(G.resumeReq)를 붙임. 기다리는 동안은 상충 조작(출근하기·새로 시작·저장 지우기·이어하기 다시 누르기)을
     함수와 화면 양쪽에서 막고, 5초 안에 잠금을 받지 못하면 요청을 취소하고 안내함. 잠금 안의 작업과 끝난 뒤의 콜백은 요청 번호가 그대로일 때만
     상태·소유권·설정·화면을 바꿈 — 취소됐거나 다른 근무가 시작된 뒤 늦게 끝난 요청은 아무것도 하지 않음 */
  function titleBusy(on) {
    G.resuming = !!on;
    ['#go', '#rp-go', '#rp-del'].forEach(function (q) { var b = $(q); if (b) b.disabled = !!on; });
    document.querySelectorAll('[data-go]').forEach(function (b) { b.disabled = !!on; });
    var rp = $('#runp'); if (rp) rp.classList.toggle('busy', !!on);
  }
  function resumeRun() {
    if (G.resuming || G.screen !== 'title') return Promise.resolve(false);
    var req = newRunId(), tok = newRunId(); G.resumeReq = req; titleBusy(true);
    var guard = setTimeout(function () {   /* 잠금을 오래 받지 못함: 요청을 무효로 하고 타이틀 조작을 돌려줌 */
      if (G.resumeReq !== req) return; G.resumeReq = null; titleBusy(false);
      var rn = $('#runp'); if (rn) { var pnote = document.createElement('p'); pnote.className = 'small'; pnote.id = 'rp-wait'; pnote.textContent = tx(L('別の画面が保存中のため、続きを始められませんでした。もう一度押してください。', '다른 화면이 저장 중이라 이어하기를 시작하지 못했습니다. 다시 눌러 주세요.', 'Another window is saving, so the shift could not be resumed. Please press again.')); if (!$('#rp-wait')) rn.appendChild(pnote); }
    }, 5000);
    function mine() { return G.resumeReq === req; }
    return storeOp(function () { return mine() ? prepResume(tok) : { cancel: true }; }).then(function (r) {
      clearTimeout(guard);
      if (!mine() || (r && r.cancel)) return false;   /* 취소된 요청: 화면·상태를 건드리지 않음 */
      G.resumeReq = null; titleBusy(false);
      if (!r || !r.ns) { if (G.screen === 'title') { G.runBad = r && r.bad === 'state' ? 'state' : G.runBad; renderTitle(); } return false; }
      S = r.ns;
      playScreen(L('前回の続き：' + r.done + '人目まで終わったところから再開しました。お客様の手続きの途中の内容は保存されないため、次のお客様から始まります。', '이어하기: ' + r.done + '번째 승객까지 마친 곳에서 다시 시작했습니다. 승객 수속 도중의 내용은 저장되지 않으므로 다음 승객부터 시작합니다.', 'Resumed after passenger ' + r.done + '. Anything done partway through a passenger is not saved, so you continue with the next passenger.'));
      return true;
    }, function () { clearTimeout(guard); if (!mine()) return false; G.resumeReq = null; titleBusy(false); if (G.screen === 'title') renderTitle(); return false; });
  }
  /* 잠금 안(동기): 최신 저장본 → 검사 → 복원 → 소유권 확정. 실패하면 아무것도 바꾸지 않음(끝난 판의 진행본 정리만) */
  function prepResume(tok) {
    var o = readRun(), why = checkRun(o); if (why) return { bad: why };
    try { if ((DY.loadStore().doneRuns || []).indexOf(o.runId) >= 0) { clearRunNow(o.runId); return { bad: 'done' }; } } catch (e) {}
    var dd = DY.list[o.day - 1], mi = dd.mission, va = mi.variants[o.country];
    var list = freshList(mi, va, o.seed), byId = {};
    allPax(list).forEach(function (p) { byId[p.id] = p; var d = (o.passengerPatches || {})[p.id]; if (d) Object.keys(d).forEach(function (k) { if (d[k] && d[k].__del) delete p[k]; else p[k] = d[k]; }); });
    var ns = { list: list, seed: o.seed, adv: true, day: dd, ac: o.ac === 'B' ? mi.layoutB : mi.aircraft, cur: null, runId: o.runId, rev: o.rev, fp: o.versions.scenario, startedAt: o.startedAt, resumed: true, resumeAt: o.cursor.completedPaxCount, tabTok: tok, takeover: false };
    var keepM = M, keepV = V;
    try {
      M = mi; V = va;   /* 복원·점검이 그 판의 미션을 씀 */
      var ctx = { byId: byId, res: o.s.results.map(function () { return {}; }) };
      o.s.results.forEach(function (r, i) { var d = decRun(r, ctx); Object.keys(d).forEach(function (k) { ctx.res[i][k] = d[k]; }); });
      RUNF.forEach(function (k) { if (k === 'results') ns.results = ctx.res; else if (k in o.s) ns[k] = decRun(o.s[k], ctx); });
      if (stateBad(ns, mi)) throw new Error('state');   /* 27차(GPT 26-F03): 되살린 상태도 완전한지 확인한 뒤에만 채택 */
    } catch (e) { M = keepM; V = keepV; return { bad: 'state' }; }
    /* 소유권 넘겨받기(나중 탭 우선): 방금 읽은 같은 rev의 저장본에 owner·rev+1을 씀 */
    try { o.owner = tok; o.rev = (o.rev || 0) + 1; delete o.fin; localStorage.setItem(RKEY, JSON.stringify(o)); ns.rev = o.rev; }
    catch (e) { M = keepM; V = keepV; return { bad: 'write' }; }
    G.day = o.day; G.country = o.country; G.practice = !!o.practice; G.hints = !!o.hints; save();   /* 근무지·모드·힌트는 그 판의 값(R25-06). 화면 언어는 지금 고른 언어 */
    return { ns: ns, done: o.cursor.completedPaxCount };
  }
  /* 타이틀의 이어하기 안내 */
  function runInfo() {
    var o = readRun(); if (!o) return null;
    var why = checkRun(o);
    if (why === 'none') return null;
    if (why) return { bad: why, o: o.err ? null : o };
    if (!o.cursor || o.cursor.completedPaxCount < 1) return null;   /* 아직 한 명도 마치지 않은 판은 이어하기를 보여 주지 않음 */
    /* 이미 기록까지 마친 판(진행본을 지우기 전에 끊긴 경우, R25-03)은 이어하기 대신 정리 */
    try { var st = DY.loadStore(); if ((st.doneRuns || []).indexOf(o.runId) >= 0) { clearRun(o.runId); return null; } } catch (e) {}
    return { o: o };
  }
  function agoText(iso) {
    var t = Date.parse(iso); if (!isFinite(t)) return '';
    var d = new Date(t), mins = Math.max(0, Math.round((Date.now() - t) / 60000)), days = Math.floor(mins / 1440);
    var hhmm = (d.getMonth() + 1) + '/' + d.getDate() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
    var ago = days >= 1 ? L(days + '日前', days + '일 전', days + (days > 1 ? ' days ago' : ' day ago')) : mins >= 60 ? L(Math.floor(mins / 60) + '時間前', Math.floor(mins / 60) + '시간 전', Math.floor(mins / 60) + 'h ago') : L(mins + '分前', mins + '분 전', mins + ' min ago');
    return hhmm + ' · ' + tx(ago);
  }
  function runPanelHtml() {
    var ri = runInfo(); if (!ri) return '';
    if (ri.bad) {
      var msg = ri.bad === 'rules' || ri.bad === 'scenario' || ri.bad === 'schema' ? L('保存された勤務は、ゲームの更新（判定のルールまたはお客様の構成）の前のものなので、続けられません。学習の記録はそのまま残っています。', '저장된 근무는 게임 업데이트(판정 규칙 또는 승객 구성) 전의 것이라 이어할 수 없습니다. 학습 기록은 그대로 남아 있습니다.', 'The saved shift is from before a game update (judging rules or passenger set), so it cannot be continued. Your record is unchanged.')
        : L('保存された勤務を読み取れないため、続けられません。学習の記録はそのまま残っています。', '저장된 근무를 읽을 수 없어 이어할 수 없습니다. 학습 기록은 그대로 남아 있습니다.', 'The saved shift could not be read, so it cannot be continued. Your record is unchanged.');
      return '<div class="panel runp bad" id="runp"><p>' + esc(tx(msg)) + '</p><div class="btns"><button class="btn ghost" id="rp-del">' + esc(tx(L('保存された勤務を消す', '저장된 근무 지우기', 'Delete the saved shift'))) + '</button></div></div>';
    }
    var o = ri.o, d = DY.list[o.day - 1], va = d.mission.variants[o.country], c = o.cursor;
    var head = L('勤務の続き', '근무 이어하기', 'Continue your shift');
    var line = 'DAY ' + o.day + ' ' + tx(d.nm) + ' · ' + tx(o.practice ? T.modeP : T.modeC) + ' · ' + va.flight + ' ' + va.from + '→' + va.to;
    var prog = tx(L(c.completedPaxCount + '/' + c.total + '人 完了 · ' + (c.completedPaxCount + 1) + '人目から続ける', c.completedPaxCount + '/' + c.total + '명 완료 · ' + (c.completedPaxCount + 1) + '번째 승객부터 이어하기', c.completedPaxCount + '/' + c.total + ' done · continue from passenger ' + (c.completedPaxCount + 1)));
    if (c.nextPhase === 'finish' || c.nextPhase === 'late') prog = tx(L(c.completedPaxCount + '/' + c.total + '人 完了 · 締め切り後の対応・結果から続ける', c.completedPaxCount + '/' + c.total + '명 완료 · 마감 후 처리·결과부터 이어하기', c.completedPaxCount + '/' + c.total + ' done · continue to the close and results'));
    return '<div class="panel runp" id="runp"><h2>' + esc(tx(head)) + '</h2><p class="rl"><b>' + esc(line) + '</b></p><p class="rl">' + esc(prog) + '</p>' +
      '<p class="small">' + esc(tx(L('保存 ', '저장 ', 'Saved '))) + esc(agoText(o.savedAt)) + ' · ' + esc(tx(L('手続きの途中の内容は保存されません（最後に終えたお客様の次から）', '수속 도중의 내용은 저장되지 않습니다(마지막으로 마친 승객 다음부터)', 'Work partway through a passenger is not saved (you restart at the next passenger)'))) + '</p>' +
      '<div class="btns"><button class="btn pri" id="rp-go">' + esc(prog.split(' · ').pop()) + ' →</button><button class="btn ghost" id="rp-del">' + esc(tx(L('この勤務をやめる（保存を消す）', '이 근무 그만두기(저장 지우기)', 'Abandon this shift (delete the save)'))) + '</button></div></div>';
  }
  function bindRunPanel() {
    if ($('#rp-go')) $('#rp-go').onclick = function () { sfx.tap(); resumeRun(); };
    if ($('#rp-del')) $('#rp-del').onclick = function () { if (G.resuming) return; askConfirm(L('保存された勤務を消しますか？', '저장된 근무를 지울까요?', 'Delete the saved shift?'), L('消した勤務は元に戻せません。学習の記録（最高成績など）はそのまま残ります。', '지운 근무는 되돌릴 수 없습니다. 학습 기록(최고 성적 등)은 그대로 남습니다.', 'This cannot be undone. Your record (best results etc.) stays.'), L('消す', '지우기', 'Delete'), function () { if (G.resuming) return; storeOp(function () { try { localStorage.removeItem(RKEY); } catch (e) {} }).then(renderTitle, renderTitle); }); };
  }
  /* 화면 안의 확인 창(alert/confirm은 쓰지 않음) */
  function askConfirm(title, body, okLabel, onOk, alt) {
    var w = document.createElement('div'); w.className = 'modal rconf'; w.id = 'runconfirm';
    w.innerHTML = '<div class="card" role="dialog" aria-modal="true" tabindex="-1"><h2>' + esc(tx(title)) + '</h2><p>' + esc(tx(body)) + '</p><div class="btns">' +
      (alt ? '<button class="btn pri" id="rc-alt">' + esc(tx(alt.label)) + '</button>' : '') + '<button class="btn' + (alt ? '' : ' pri') + '" id="rc-ok">' + esc(tx(okLabel)) + '</button><button class="btn ghost" id="rc-no">' + esc(tx(L('キャンセル', '취소', 'Cancel'))) + '</button></div></div>';
    document.body.appendChild(w);
    function close() { if (w.parentNode) w.parentNode.removeChild(w); }
    w.querySelector('#rc-ok').onclick = function () { close(); onOk(); };
    w.querySelector('#rc-no').onclick = close;
    if (alt) w.querySelector('#rc-alt').onclick = function () { close(); alt.run(); };
    try { w.querySelector('.card').focus({ preventScroll: true }); } catch (e) {}
  }
  /* ---------- 화면: 타이틀 ---------- */
  function renderTitle() {
    G.screen = 'title'; document.body.classList.remove('busy'); playCls();
    var hero = '<div class="herostage"><img class="bg" src="' + STG.src('checkin_bg_01') + '" alt="">' +
      STG.img('staff_checkin_greet_01', '', 50, 2, 86) + STG.img('passenger_female_01', '', 76, 2, 66) + STG.img('passenger_male_02', '', 88, 4, 62) +
      STG.img('koradon_greet_01', 'mas', 15, 3, 44) + STG.img('korarin_greet_01', 'mas', 30, 3, 42) + '</div>';
    var st = STAGES.map(function (s) {
      var cls = s.st === 'play' ? 'play' : 'lock' + (s.key ? ' key' : '');
      var lab = s.st === 'play' ? L('勤務できます', '근무 가능', 'Open') : (s.key ? L('★ 計算の実習ステージ・準備中', '★ 계산 실습 스테이지·준비 중', '★ Hands-on calculation stage · coming') : L('準備中', '준비 중', 'Coming'));
      /* 27차(사용자 10-14): 연습 모드도 체크인편 DAY 1~5는 바로 열리지만, STAGE 02는 체크인편을 실전으로 끝낸 뒤(DAY 5 B 이상·안전 합격·전원 처리) 열림 */
      if (s.n === '02' && s.st !== 'play') { var ok5 = ciCleared(); lab = ok5 ? L('準備中（チェックイン編クリア済み）', '준비 중(체크인편 클리어)', 'Coming (Check-in cleared)') : L('チェックイン編の本番DAY 5をクリアすると開きます・準備中', '체크인편 실전 DAY 5를 통과하면 열립니다 · 준비 중', 'Opens after you clear Check-in DAY 5 in Shift mode · coming'); }
      return '<button class="stg ' + cls + '" ' + (s.st === 'play' ? 'data-go="1"' : 'disabled') + '><span class="n">STAGE ' + s.n + '</span><span class="nm">' + esc(tx(s.nm)) + '</span><span class="st">' + esc(tx(lab)) + '</span></button>';
    }).join('');
    var dd = curDay(); G.day = dd.n; applyDayHints(dd.n);
    var days = DY.list.map(function (d) {
      var stt = DY.status(G.hist, d.n, G.country, G.practice), r = DY.rec(G.hist, d, G.country);
      var lab = stt === 'soon' ? L('準備中', '준비 중', 'Coming') : stt === 'lock' ? L('前の日をB以上・安全合格で', '앞의 날을 B 이상·안전 합격으로', 'Clear the day before: B or better, safety pass') : r ? L('最高 ', '최고 ', 'Best ') : L('勤務できます', '근무 가능', 'Open');
      var best = r && stt === 'open' ? (r.plays ? bestText(r, d.n) : (r.legacyBest ? tx(L('以前の記録 ', '이전 기록 ', 'Earlier ')) + r.legacyBest : '')) : '';
      if (r && !r.plays && stt === 'open') lab = L('勤務できます · ', '근무 가능 · ', 'Open · ');
      if (r && r.plays && !r.top && stt === 'open') lab = L('', '', '');
      /* 24차b(GPT 의견): 연습 모드에서도 첫 화면의 최고 기록은 실전 기록 — 「실전」이라고 밝힘 */
      if (G.practice && r && stt === 'open' && (r.plays || r.legacyBest)) lab = { ja: '本番 ' + lab.ja, ko: '실전 ' + lab.ko, en: 'Shift ' + lab.en };
      return '<button class="day ' + stt + (d.n === dd.n ? ' on' : '') + '" data-day="' + d.n + '"' + (stt === 'open' ? '' : ' disabled') + '><span class="n">DAY ' + d.n + '</span><span class="nm">' + esc(tx(d.nm)) + '</span><span class="lr">' + esc(tx(d.learn)) + '</span><span class="st">' + esc(tx(lab)) + esc(best) + '</span></button>';
    }).join('');
    $('#app').innerHTML =
      '<div class="title"><div class="hero">' + hero + '<div class="tt"><h1>AIRLINE SAGA</h1><div class="sub">' + esc(tx(T.brandSub)) + '</div></div></div>' + runPanelHtml() +   /* 26차: 저장된 근무가 있으면 맨 위에 */
      '<div class="panel"><h2 class="langh">' + esc(tx(T.lang)) + '</h2><div class="seg" id="seglang">' + ['ja', 'ko', 'en'].map(function (l) { return '<button data-l="' + l + '" class="' + (G.lang === l ? 'on' : '') + '">' + { ja: '日本語', ko: '한국어', en: 'English' }[l] + '</button>'; }).join('') + '</div>' +
      '<h2 class="stah">' + esc(tx(T.station)) + '</h2><div class="seg" id="segc"><button data-c="JP" class="' + (G.country === 'JP' ? 'on' : '') + '">' + esc(tx(T.jp)) + '</button><button data-c="KR" class="' + (G.country === 'KR' ? 'on' : '') + '">' + esc(tx(T.kr)) + '</button></div>' +
      '<p style="font-size:13px;color:var(--sub);margin:8px 0 0">' + esc(tx(T.stationNote)) + '</p>' +
      '<div class="seg" style="margin-top:10px"><button id="tg-h" class="' + (G.hints ? 'on' : '') + '">' + esc(tx(T.hints)) + '</button><button id="tg-s" class="' + (G.sound ? 'on' : '') + '">' + esc(tx(T.sound)) + '</button><button id="tg-v" class="' + (G.voice ? 'on' : '') + '">' + esc(tx(T.voice)) + '</button></div></div>' +
      '<div class="panel"><h2>' + esc(tx(T.days)) + '</h2>' +
      /* 24차 추가(사용자 18:43·20:22)：휴대폰·PC 모두 같은 자리에 「실전 | 연습」 두 칸. 지금 어느 쪽인지 늘 보이게(기기마다 저장된 설정이 달라 「PC에만 연습이 있다」로 보였음) */
      '<div class="seg mode" id="segmode" role="group"><button id="tg-c" aria-pressed="' + !G.practice + '" class="' + (G.practice ? '' : 'on') + '"><b>' + esc(tx(T.modeC)) + '</b><span>' + esc(tx(L('DAY 1から順番に', 'DAY 1부터 차례대로', 'DAY 1 onward, in order'))) + '</span></button>' +
      '<button id="tg-p" aria-pressed="' + !!G.practice + '" class="' + (G.practice ? 'on' : '') + '"><b>' + esc(tx(T.modeP)) + '</b><span>' + esc(tx(L('全部の日・記録は別', '모든 날·기록 따로', 'All days · separate records'))) + '</span></button></div>' +
      '<p class="modenote">' + esc(tx(G.practice ? L('練習：どの日もすぐ選べます。記録は練習用に別に残り、本番の進み具合は変わりません。', '연습: 어느 날이든 바로 고를 수 있습니다. 기록은 연습용으로 따로 남고, 실전 진행에는 영향이 없습니다.', 'Practice: pick any day right away. Results are kept separately and do not change your shift-mode progress.') : L('本番：前の日をB以上・安全合格で終えると次の日が開きます。結果は学習の記録に残ります。', '실전: 앞의 날을 B 이상·안전 합격으로 마치면 다음 날이 열립니다. 결과는 학습 기록에 남습니다.', 'Shift mode: clear a day with B or better and a safety pass to open the next. Results go into your record.'))) + '</p>' +
      '<div class="days" id="days">' + days + '</div>' +
      (G.hints && !G.practice ? '<p class="small" style="margin:6px 0 0">' + esc(tx(L('ヒントON：DAY 1（はじめての勤務）はヒントを使ってもSまで。DAY 2以降は最高ランクがAになります。', '힌트 켬: DAY 1(첫 근무)은 힌트를 써도 S까지 받을 수 있고, DAY 2부터는 최고 등급이 A입니다.', 'Tips on: DAY 1 (first shift) can still reach S with tips; from DAY 2 the best possible rank is A.'))) + '</p>' : '') + '</div>' +
      hashNoteHtml() + '<button class="start" id="go">' + esc(tx(T.start)) + (G.practice ? ' · ' + esc(tx(T.modeP)) : '') + ' · DAY ' + dd.n + ' ' + esc(tx(dd.nm)) + ' · ' + dd.mission.variants[G.country].flight + ' ' + dd.mission.variants[G.country].from + '→' + dd.mission.variants[G.country].to + '</button>' +
      '<div class="panel"><h2>' + esc(tx(T.stages)) + '</h2><div class="stages">' + st + '</div></div>' +
      '<p style="font-size:12px;color:var(--sub)">' + esc(tx(T.edu)) + '</p><p style="font-size:11px;color:var(--sub);margin-top:-6px">' + esc(tx(T.credit)) + '</p></div>';
    $('#seglang').onclick = function (e) { var b = e.target.closest('button'); if (!b) return; setLang(b.dataset.l); };
    $('#segc').onclick = function (e) { var b = e.target.closest('button'); if (!b) return; G.country = b.dataset.c; save(); renderTitle(); };
    $('#tg-h').onclick = function () { G.hints = !G.hints; G.hintsByDay[G.day] = G.hints; save(); renderTitle(); };
    $('#tg-s').onclick = function () { G.sound = !G.sound; save(); renderTitle(); };
    $('#tg-v').onclick = function () { G.voice = !G.voice; VO.on = G.voice; save(); renderTitle(); };
    $('#go').onclick = startMission; bindRunPanel();
    $('#tg-p').onclick = function () { if (G.practice) return; G.practice = true; save(); renderTitle(); };
    $('#tg-c').onclick = function () { if (!G.practice) return; G.practice = false; save(); renderTitle(); };
    $('#days').onclick = function (e) { var b = e.target.closest('button[data-day]'); if (!b || b.disabled) return; G.day = +b.dataset.day; save(); renderTitle(); };
    document.querySelectorAll('[data-go]').forEach(function (b) { b.onclick = startMission; });
    if (G.resuming) titleBusy(true);   /* 30차: 언어·날 바꾸기로 다시 그려도 기다리는 동안은 그대로 막음 */
  }

  /* ---------- 화면: 근무 ---------- */
  function barInner() {
    return '<div class="brand">' + '<svg viewBox="-16 -16 32 32">' + SP.logo(0, 0, 15, '#24346b', '#f0a030') + '</svg>AIRLINE SAGA</div>' +
      '<div class="fl"><b>' + V.flight + '</b> ' + V.from + '→' + V.to + ' STD ' + V.std + (S && S.delay ? ' <span class="pill warn">ETD ' + V.etd + '</span>' : '') + (G.practice ? ' <span class="pill prac">' + esc(tx(T.modeP)) + '</span>' : '') + '</div>' +
      '<div class="stats"><span class="stat">' + esc(tx(T.now)) + ' <b id="clk"></b></span><span class="stat" id="stclose">' + esc(tx(T.close)) + ' <b id="cls"></b></span><span class="stat">' + esc(tx(T.queue)) + ' <b id="que"></b></span><span class="stat">' + esc(tx(T.served)) + ' <b id="done"></b></span>' +
      '</div><button class="iconbtn' + (G.voice ? ' von' : '') + '" id="vo" aria-label="voice">' + esc(tx(L('音声', '음성', 'Voice'))) + '</button><button class="iconbtn" id="quit" aria-label="quit">✕</button>';
  }
  function bindBar() {
    $('#quit').onclick = function () { VO.stop(); renderTitle(); };
    $('#vo').onclick = function () { G.voice = !G.voice; VO.on = G.voice; if (!G.voice) VO.stop(); this.classList.toggle('von', G.voice); save(); };
  }
  /* 26차: 새 판 시작 — 이어할 수 있는 근무가 저장되어 있으면 먼저 확인(R25-07: 날·근무지를 고르기만 해서는 지우지 않음, 실제로 새로 시작할 때만) */
  function startMission() {
    if (G.resuming) return;   /* 30차: 이어하기를 기다리는 동안은 새 근무를 시작하지 않음 */
    var ri = runInfo();
    if (ri && !ri.bad && G.screen === 'title') {
      var o = ri.o, od = DY.list[o.day - 1], ov = od.mission.variants[o.country], what = 'DAY ' + o.day + ' ' + tx(od.nm) + ' · ' + tx(o.practice ? T.modeP : T.modeC) + ' · ' + ov.flight + ' ' + ov.from + '→' + ov.to;
      return askConfirm(L('保存された勤務があります', '저장된 근무가 있습니다', 'You have a saved shift'),
        L(what + '（' + o.cursor.completedPaxCount + '/' + o.cursor.total + '人 完了）。新しく始めると、保存された勤務は消えます。', what + '(' + o.cursor.completedPaxCount + '/' + o.cursor.total + '명 완료). 새로 시작하면 저장된 근무는 지워집니다.', what + ' (' + o.cursor.completedPaxCount + '/' + o.cursor.total + ' done). Starting a new shift deletes the saved one.'),
        L('新しく始める', '새로 시작', 'Start new'), beginMission, { label: L('続きから', '이어하기', 'Continue'), run: resumeRun });
    }
    beginMission();
  }
  function beginMission() {
    if (G.resuming) return;
    newMission(); S.runId = newRunId(); S.rev = 0; S.startedAt = new Date().toISOString(); S.fp = scenFp(M, freshList(M, V, S.seed), V); S.tabTok = newRunId();
    clearRun(); playScreen();
  }
  function playScreen(resumeMsg) {
    document.body.classList.remove('busy'); G.screen = 'play'; playCls(); sfx.tap(); VO.on = G.voice; VO.unlock(); VO.stop();
    var ap = R.airport[V.from];
    $('#app').innerHTML =
      '<div class="bar" id="gbar">' + barInner() + '</div><p class="runnote" id="runnote" role="status"' + (resumeMsg ? '' : ' hidden') + '>' + (resumeMsg ? esc(tx(resumeMsg)) : '') + '</p>' +
      '<div class="main"><div class="left"><div class="scenebox" id="scenebox">' + STG.html({ flight: V.flight, to: V.to, std: V.std, counter: ap.counter }) +
      '<div class="bubbles"><div class="bubble me hide" id="bme"></div><div class="bubble pax hide" id="bpx"></div></div></div><div class="guide hide" id="guide"></div></div>' +
      '<div class="term' + (S.manual ? ' manual' : '') + '"><div class="tabs" id="tabs"></div>' + (S.adv ? '<div class="svrow"><button class="btn svb" id="svb">' + esc(tx(L('責任者（SV）に確認・報告', '책임자(SV)에게 확인·보고', 'Check with / report to the supervisor (SV)'))) + '</button></div>' : '') + '<div class="screen" id="scr"></div></div></div>' +
      '<div id="modal"></div>';
    bindBar(); if ($('#svb')) $('#svb').onclick = askSV;
    try { if (window.MutationObserver) new MutationObserver(modalInert).observe($('#modal'), { childList: true }); } catch (e) {}
    if (S.manual) { var mon = document.querySelector('#stage .monitor'); if (mon) mon.style.filter = 'brightness(.25)'; }   /* 26차: DCS 장애 중에 이어하면 화면도 수기 상태 */
    updateBar(); drawQueue(); nextPax();
    topOfGame(); /* 타이틀·결과 화면 아래쪽 버튼으로 시작해도 장면부터 보이게(결과 화면과 같은 처리) */
  }
  function updateBar() {
    if (!$('#clk')) return;
    $('#clk').textContent = hm(S.lateAt || S.clock);
    var left = S.close - S.clock; $('#cls').textContent = (left >= 0 ? left.toFixed(0) : 0) + tx(T.min);
    $('#stclose').classList.toggle('alert', left < 10);
    $('#que').textContent = S.bgQueue + Math.max(0, S.list.length - S.idx - 1);
    $('#done').textContent = S.results.length + '/' + S.list.length;
  }
  function drawQueue() { STG.queue(S.list.slice(S.idx + 1)); }
  function exprOf(m) { return m >= 75 ? 'happy' : m >= 50 ? 'neutral' : m >= 30 ? 'worried' : 'upset'; }
  function drawPax() { STG.pax(S.cur ? S.cur.p : null, S.cur ? S.cur.mood : 0); }
  /* 음성 배역: 그림이 바뀌어도(지팡이→공항 휠체어) 같은 사람은 같은 목소리·같은 음성 키 */
  function voiceCast(p) { return String(p.voice || p.art || '').replace(/_wheelchair$/, '_cane'); }
  function say(who, text, silent, vtext) {   /* 27차: vtext = 음성 키로 쓸 대사(좌석 번호처럼 바뀌는 부분을 뺀 고정 문장) */
    var el = who === 'me' ? $('#bme') : $('#bpx');
    if (!el || !S || !S.cur) return;
    S.bub = S.bub || {}; S.bub[who] = text || null;
    if (!text) { el.classList.add('hide'); return; }
    el.innerHTML = '<span class="who">' + esc(who === 'me' ? tx(T.you) : (S.cur.p.pp.sur + ' ' + S.cur.p.pp.given)) + '</span>' + esc(tx(text)) + (G.lang !== 'ja' && G.voice && text.ja ? '<span class="jsub">' + esc(text.ja) + '</span>' : '');
    if (!silent && G.voice && text.ja) VO.say(who === 'me' ? 'staff' : voiceCast(S.cur.p), (vtext || text).ja);
    el.classList.remove('hide');
  }
  function guide(text) { var g = $('#guide'); if (!g) return; if (S) S.guideL = text || null; if (typeof text === 'object' && text) text = tx(text); if (!G.hints || !text) { g.classList.add('hide'); return; } g.innerHTML = STG.mascot('koradon', 'idle', 'gm') + '<div><b>' + esc(tx(T.mentor)) + '</b><span>' + text + '</span></div><button class="gx" aria-label="close">✕</button>'; g.classList.remove('open'); g.onclick = function (e) { if (e.target.closest('.gx')) { g.classList.add('hide'); return; } g.classList.toggle('open'); }; g.classList.remove('hide'); }

  function nextPax() {
    if (S.cur) S.results.push(S.cur);
    S.cur = null;
    saveRun();   /* 26차 체크포인트(R25-01): 결과 확정 → 완료 인원·다음 순서 확정 → 저장 → 이벤트/다음 승객 */
    if (S.adv && M.events && S.clock < S.close) {
      if (S.results.length === M.events.swapAfter && !S.e1) return runSwap();
      if (S.results.length === M.events.recoverAfter && S.manual && !S.recovered) return runRecovery();
      if (M.events.delayAtStart && !S.delay) return runDelay();
      if (S.results.length === M.events.overbookAfter && !S.ob) return runOverbook();
    }
    if (M.events && M.events.lateAtEnd && !S.lateDone && (S.idx + 1 >= S.list.length || S.clock >= S.close)) return runLate();
    S.idx++; VO.stop();
    if (S.idx >= S.list.length || S.clock >= S.close) { finish(); return; }
    var p = S.list[S.idx];
    var wait = S.idx * 3 + Math.max(0, S.clock - pm(V.start) - S.idx * 6);
    S.cur = { p: p, mood: Math.max(50, 90 - wait * .4), mins: 0, tab: 'pnr', notes: [], chk: {}, seat: null, bags: p.bags.map(function () { return { w: null, tag: null }; }), dg: false, pnr: false, pp: false, entryQ: false, bp: false, flags: {}, needSV: has(p, 'expired') || has(p, 'brother') || has(p, 'noEsta') || !!(p.sup && ((p.sup.type === 'pet' && p.sup.kind !== 'ok') || (p.sup.type === 'preg' && ['stale', 'over', 'multi'].indexOf(p.sup.kind) >= 0))), sup: {}, svDone: false, svAsks: 0, selfFix: [], fixTry: {}, acts: {} };
    if (S.delay) d5Arrive(S.cur);
    $('#paxwrap').style.transition = 'none'; $('#paxwrap').style.transform = 'translateX(30%)'; $('#paxwrap').style.opacity = 0; void $('#paxwrap').offsetWidth; $('#paxwrap').style.transition = '';
    drawQueue(); drawPax(); STG.bag(null); $('#scalelcd').textContent = '0.0';
    requestAnimationFrame(function () { requestAnimationFrame(function () { var pw = $('#paxwrap'); if (!pw) return; pw.style.transform = 'translateX(0)'; pw.style.opacity = 1; }); });
    say('me', D.greet);
    var me0 = S.cur; setTimeout(function () { if (S.cur === me0 && G.screen === 'play') say('pax', p.say.hello); }, 650);
    addTime(M.cost.greet); updateBar();
    if (has(p, 'tutorial')) guide(L('まずは<b>「予約」</b>でお客様の予約を呼び出しましょう。次に<b>「旅券」</b>の3項目（有効期限・写真とご本人・予約の名前。幼児連れなら幼児の旅券も）、<b>「渡航条件」</b>、<b>「座席」</b>、<b>「手荷物」</b>（保安質問も）、最後に<b>「搭乗券」</b>です。順番は自由ですが、確認を飛ばすと後で問題が起きます。',
      '먼저 <b>「예약」</b>에서 승객의 예약을 불러오세요. 다음은 <b>「여권」</b> 3항목(유효기간·사진과 본인·예약 이름, 유아 동반이면 유아 여권도), <b>「입국 조건」</b>, <b>「좌석」</b>, <b>「수하물」</b>(보안 질문 포함), 마지막으로 <b>「탑승권」</b>입니다. 순서는 자유지만 확인을 건너뛰면 나중에 문제가 생깁니다.',
      'Start with <b>Booking</b> to pull up the reservation. Then the three <b>Passport</b> checks (validity, photo vs. face, booking name — plus the infant\'s passport if there is one), <b>Entry</b>, <b>Seat</b>, <b>Bags</b> (with the security questions), and finally the <b>Boarding pass</b>. Any order works, but skipped checks come back to bite you.'));
    else guide(S.adv ? d2Hint(p) : '');
    renderTabs(); showTab('pnr'); STG.pose('greet', 2200);
    if (p.claim && !S.cur.flags.claimDone) { var mcl = S.cur; setTimeout(function () { if (S.cur === mcl && G.screen === 'play' && !mcl.flags.claimDone && !mcl.bp) runClaim(); }, 1500); }   /* 27차: 클레임 */
    if (S.delay && p.complain && !S.cur.flags.cmpDone) { var me2 = S.cur; setTimeout(function () { if (S.cur === me2 && G.screen === 'play' && !me2.flags.cmpDone) runComplaint(); }, 1500); }
    if (S.adv && M.events && S.idx === M.events.dcsAt && !S.e2) { var me1 = S.cur; setTimeout(function () { if (S.cur === me1 && G.screen === 'play' && !S.e2) runDcsDown(); }, 1400); }
  }

  /* ---------- 단말 탭 ---------- */
  function tabState(k) {
    var c = S.cur;
    if (k === 'pnr') return c.pnr ? 'ok' : '';
    if (k === 'pp') { var v = ['validity', 'photo', 'ticketName'].concat(c.p.inf ? ['infpp'] : []).map(function (x) { return c.chk[x]; }); if (v.some(function (x) { return x === 'ng'; })) return 'ng'; return v.every(Boolean) ? 'ok' : (c.pp ? 'wait' : ''); }
    if (k === 'entry') return c.chk.entry === 'ng' ? 'ng' : c.chk.entry && (!S.delay || !c.p.conn || c.chk.conn) ? 'ok' : (c.entryQ ? 'wait' : '');
    if (k === 'seat') return c.p.party ? ((c.famSeats || []).length === 3 ? 'ok' : (c.famSeats || []).length ? 'wait' : '') : c.seat ? 'ok' : '';
    if (k === 'bag') return c.bags.every(function (b) { return b.tag; }) ? 'ok' : (c.bags.some(function (b) { return b.w; }) ? 'wait' : '');
    if (k === 'bp') return c.bp ? 'ok' : '';
    if (k === 'sup') return supState(c);
  }
  function renderTabs() {
    $('#tabs').classList.toggle('many', !!S.cur.p.sup); $('#tabs').innerHTML = (S.cur.p.sup ? ['pnr', 'pp', 'sup', 'entry', 'seat', 'bag', 'bp'] : ['pnr', 'pp', 'entry', 'seat', 'bag', 'bp']).map(function (k) { return '<button class="tab' + (S.cur.tab === k ? ' on' : '') + '" data-k="' + k + '"><i class="' + (tabState(k) || '') + '"></i>' + esc(tx(T.tabs[k])) + '</button>'; }).join('');
    $('#tabs').onclick = function (e) { var b = e.target.closest('button'); if (!b) return; sfx.tap(); showTab(b.dataset.k); };
  }
  function showTab(k) { S.cur.tab = k; renderTabs(); STG.pose({ pnr: 'check', pp: 'check', entry: 'check', seat: 'explain', bag: 'explain', bp: 'idle', sup: 'explain' }[k] || 'idle'); ({ pnr: tabPNR, pp: tabPP, entry: tabEntry, seat: tabSeat, bag: tabBag, bp: tabBP, sup: tabSup })[k](); if (S.leaving && S.leaveGo && !$('#nextpax') && $('#scr')) { $('#scr').insertAdjacentHTML('beforeend', '<div class="btns"><button class="btn pri nextpax" id="nextpax">' + esc(tx(L('次のお客様へ ▶', '다음 승객 ▶', 'Next passenger ▶'))) + '</button></div>'); bindNextPax(); } }
  function ACFT() { return (S && S.ac) || M.aircraft; }
  function scr(h) { $('#scr').innerHTML = (S && S.manual ? '<div class="manbanner">' + esc(tx(L('手作業チェックイン中（DCS障害）― 紙の座席表・手書きの搭乗券とタグ・手荷物リスト', '수기 체크인 중(DCS 장애) — 종이 좌석표·손으로 쓴 탑승권과 태그·수하물 목록', 'Manual check-in (DCS outage) — paper seat chart, handwritten boarding passes and tags, bag list'))) + '</div>' : '') + (S && S.delay && S.cur ? delayBanner(S.cur) : '') + h; var db = $('#dlb'); if (db) db.onclick = tellDelay; }

  /* 예약 */
  function tabPNR() {
    var c = S.cur, p = c.p;
    if (!c.pnr) {
      scr('<div class="h3">' + esc(tx(L('予約を呼び出す', '예약 불러오기', 'Retrieve booking'))) + '</div><p class="small">' + esc(tx(L('お客様の航空券（eチケット控え）にある予約番号で検索します。', '승객의 항공권(e티켓 사본)에 있는 예약번호로 검색합니다.', 'Search with the booking reference on the passenger\'s e-ticket receipt.'))) + '</p>' +
        '<div class="row mono" style="margin:10px 0">&gt; RT <span style="color:var(--termwarn)">' + p.pnr.rloc + '</span></div><div class="btns"><button class="btn pri" id="doPnr">' + esc(tx(L('検索する', '검색', 'Search'))) + '</button></div>');
      $('#doPnr').onclick = function () { c.pnr = true; addTime(M.cost.pnr); sfx.ok(); say('me', D.pnrOk); tabPNR(); renderTabs(); };
      return;
    }
    var req = { window: L('窓側', '창가', 'Window'), aisle: L('通路側', '통로', 'Aisle'), exit: L('非常口座席', '비상구 좌석', 'Exit row') }[p.pnr.req];
    scr('<div class="h3">PNR ' + p.pnr.rloc + '</div><dl class="kv">' +
      '<dt>' + esc(tx(L('氏名', '이름', 'Name'))) + '</dt><dd>' + p.pnr.sur + '/' + p.pnr.given + ' ' + p.pnr.title + (p.pnr.party ? '<br>' + p.pnr.party.join('<br>') : '') + (c.flags.nameWas ? '<br><span class="small">' + esc(tx(c.flags.rebooked ? L('新しい予約（旧：', '새 예약(이전: ', 'New booking (was ') : L('訂正済み（旧：', '정정 완료(이전: ', 'Corrected (was '))) + c.flags.nameWas + ')</span>' : '') + '</dd>' +
      '<dt>' + esc(tx(T.flight)) + '</dt><dd>' + V.flight + ' ' + M.date.slice(8) + 'OCT ' + V.from + V.to + ' ' + V.std.replace(':', '') + '</dd>' +
      '<dt>' + esc(tx(L('クラス', '클래스', 'Class'))) + '</dt><dd>Y</dd>' +
      (p.conn ? '<dt>' + esc(tx(L('乗り継ぎ', '연결편', 'Connection'))) + '</dt><dd class="hl">' + p.conn.flight + ' ' + p.conn.from + p.conn.to + ' ' + p.conn.dep.replace(':', '') + '→' + p.conn.arr.replace(':', '') + '<br><span class="small">' + esc(tx(L('同一航空券・連帯運送の契約あり（教育用）・乗り継ぎ ', '같은 항공권·연대운송 계약 있음(교육용)·연결 ', 'Same ticket · through-check agreement (training) · connection '))) + Math.floor(p.conn.cnx / 60) + 'h' + ('0' + p.conn.cnx % 60).slice(-2) + ' / MCT ' + p.conn.mct + tx(T.min) + '</span></dd>' : '') +
      (p.ret ? '<dt>' + esc(tx(L('復路', '귀국편', 'Return'))) + '</dt><dd>' + p.ret + '</dd>' : '') +
      (p.pnr.remark ? '<dt>' + esc(tx(L('備考', '비고', 'Remarks'))) + '</dt><dd class="hl">' + p.pnr.remark + '<br><span class="small">' + esc(tx(L('同行者（別予約）', '동행자(별도 예약)', 'Companion (separate booking)'))) + '</span></dd>' : '') +
      '<dt>SSR</dt><dd class="' + (p.pnr.ssr.length ? 'hl' : '') + '">' + (p.pnr.ssr.join('<br>') || '—') + '</dd>' +
      '<dt>' + esc(tx(L('座席の希望', '좌석 희망', 'Seat request'))) + '</dt><dd>' + (req ? esc(tx(req)) : '—') + '</dd>' +
      '<dt>' + esc(tx(L('無料手荷物', '무료 수하물', 'Free bags'))) + '</dt><dd>1PC 23KG <span class="small">(Vela Air)</span></dd>' +
      '<dt>' + esc(tx(L('ステータス', '상태', 'Status'))) + '</dt><dd>HK1 · ' + (c.bp ? 'CKIN' : 'NOT CHECKED-IN') + '</dd></dl>' +
      '<div class="btns"><button class="btn" data-t="pp">' + esc(tx(T.tabs.pp)) + ' →</button></div>');
    $('#scr').querySelector('[data-t]').onclick = function () { showTab('pp'); };
  }

  /* 여권 */
  function infLine(p) { var i = p.inf, ss = (p.pnr.ssr || []).filter(function (x) { return /^INFT /.test(x); })[0]; return esc(i.sur + '/' + i.given + (i.dob ? ' · DOB ' + i.dob : '') + (i.exp ? ' · EXP ' + i.exp : '') + (ss ? ' · PNR ' + ss : '')); }
  function truth(k) { var p = S.cur.p; if (k === 'infpp') return p.inf && p.inf.exp && p.inf.exp < M.date ? 'ng' : 'ok'; if (k === 'validity') return p.pp.exp < M.date ? 'ng' : 'ok'; if (k === 'ticketName') return has(p, 'name') && !S.cur.flags.nameFixed ? 'ng' : 'ok'; if (k === 'entry') return has(p, 'visa') || has(p, 'noEsta') ? 'ng' : 'ok'; if (k === 'conn') return connLeft(p) >= p.conn.mct ? 'ok' : 'ng'; return 'ok'; }
  function issuedOf(p) { if (p.issued) return p.issued; var e = p.pp.exp.split('-'); var d = new Date(Date.UTC(+e[0] - 10, +e[1] - 1, +e[2] + 1)); return d.toISOString().slice(0, 10); }
  function tabPP() {
    var c = S.cur, p = c.p;
    if (!c.pp) {
      scr('<div class="h3">' + esc(tx(L('旅券を受け取る', '여권 받기', 'Take the passport'))) + '</div><p class="small">' + esc(tx(L('写真と本人、有効期限、航空券の名前を必ず照合します。', '사진과 본인, 유효기간, 항공권 이름을 반드시 대조합니다.', 'Always match the photo to the person, the expiry date and the name on the ticket.'))) + '</p><div class="btns"><button class="btn pri" id="getpp">' + esc(tx(L('旅券を開く', '여권 펼치기', 'Open passport'))) + '</button></div>');
      $('#getpp').onclick = function () { c.pp = true; addTime(M.cost.passport); sfx.tap(); say('me', D.ppTake); tabPP(); renderTabs(); };
      return;
    }
    var face = STG.has(p.art) ? STG.portrait(p) : '<svg viewBox="-40 -120 80 120" width="80" height="104">' + SP.sd(Object.assign({}, p.look, { baby: false, expr: 'neutral', scale: 1 })) + '</svg>';
    var natName = { JPN: L('日本', '일본', 'Japan'), KOR: L('大韓民国', '대한민국', 'Republic of Korea'), LUM: L('ルメリア共和国（架空）', '루메리아 공화국(가상)', 'Republic of Lumeria (fictional)') }[p.pp.nat];
    var html = '<div class="pp"><div class="t">PASSPORT · ' + esc(tx(natName)) + '</div><div class="ph">' + face + '</div><div>' +
      'Surname<br><b>' + p.pp.sur + '</b><br>Given names<br><b>' + p.pp.given + '</b><br>Nationality ' + p.pp.nat + ' · Sex ' + p.pp.sex + '<br>Date of birth ' + p.pp.dob + (S.adv ? '<br>Date of issue ' + issuedOf(p) : '') + '<br>Date of expiry <b>' + p.pp.exp + '</b><br>No. ' + p.pp.no + '</div>' +
      '<div class="mrz">P&lt;' + p.pp.nat + p.pp.sur + '&lt;&lt;' + p.pp.given + '&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br>' + p.pp.no + '&lt;' + p.pp.nat + p.pp.dob.replace(/-/g, '').slice(2) + '</div></div>';
    if (p.visa) html += '<div class="pp" style="margin-top:8px;grid-template-columns:1fr"><div class="t">VISA · ' + (p.visa.dest === 'KR' ? 'REPUBLIC OF KOREA' : 'JAPAN') + ' <span style="font-weight:400">(' + esc(tx(L('教育用', '교육용', 'training'))) + ')</span></div><div>Type ' + p.visa.type + ' · Single entry<br>Valid until <b>' + p.visa.until + '</b><br>Name ' + p.pp.sur + ' ' + p.pp.given + '</div></div>';
    if (p.inf) html += '<div class="small" style="margin-top:6px;display:flex;gap:8px;align-items:center">' + (p.inf.photo && STG.has('passport_' + p.inf.photo + '_front_01') ? '<span style="flex:0 0 auto">' + STG.portrait({ photo: p.inf.photo }, 'small') + '</span>' : '') + '<span style="min-width:0">INF: ' + p.inf.sur + ' ' + p.inf.given + ' · ' + p.inf.dob + ' · exp ' + p.inf.exp + (p.inf.rel ? ' · ' + esc(tx(L('同伴：', '동반: ', 'With: '))) + esc(tx(p.inf.rel)) : '') + '</span></div>';
    if (p.party) html += '<p class="small" style="margin-top:6px">' + esc(tx(L('同行者2名の旅券は「サポート」タブで確認します。', '동행자 2명의 여권은 「지원」 탭에서 확인합니다.', 'Check the two companions\' passports on the Assistance tab.'))) + '</p>';
    var items = [['validity', L('有効期限・残存期間', '유효기간·잔여기간', 'Validity and remaining time')], ['photo', L('写真と本人の一致', '사진과 본인 일치', 'Photo matches the person')], ['ticketName', L('航空券（予約）の名前', '항공권(예약) 이름', 'Name on the ticket (booking)')]];
    /* 24차(사용자 지적): 유아(INF) 동반이면 유아 여권도 대조 — 유효기간·이름(예약의 INFT와)·만 2세 미만 */
    if (p.inf) items.push(['infpp', L('幼児の旅券（有効期限・名前・2歳未満）', '유아 여권(유효기간·이름·만 2세 미만)', 'Infant passport (validity, name, under 2)')]);
    html += '<div class="chk">' + items.map(function (it) {
      var v = c.chk[it[0]];
      return '<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap"><span style="flex:1;min-width:140px">' + esc(tx(it[1])) + (it[0] === 'ticketName' ? ' <span class="small mono">PNR: ' + p.pnr.sur + '/' + p.pnr.given + '</span>' : '') + (it[0] === 'infpp' ? ' <span class="small mono">' + infLine(p) + '</span>' : '') + (it[0] === 'validity' && S.adv ? ' <span class="small mono">' + esc(tx(L('本日 ', '오늘 ', 'Today '))) + M.date + (p.ret ? ' / ' + esc(tx(L('復路 ', '귀국 ', 'Return '))) + p.ret.split(' ')[2] : '') + '</span>' : '') + '</span>' +
        (v ? '<span class="pill ' + (v === 'ok' ? 'ok' : 'ng') + '">' + esc(tx(v === 'ok' ? T.ok : T.ng)) + '</span>' + reBtn(it[0]) :
          (it[0] === 'photo' && S.adv) ? '<button class="btn pri" style="padding:6px 10px" id="cmp">' + esc(tx(L('お客様と写真を照合する', '승객과 사진 대조하기', 'Compare the photo with the passenger'))) + '</button>' :
          '<button class="btn" style="padding:6px 10px" data-ck="' + it[0] + '" data-v="ok">' + esc(tx(T.ok)) + '</button><button class="btn warnb" style="padding:6px 10px" data-ck="' + it[0] + '" data-v="ng">' + esc(tx(T.ng)) + '</button>') + '</div>';
    }).join('') + '</div><p class="small" style="margin-top:8px">' + esc(tx(L('入国・通過の条件は「渡航条件」タブで確認します。', '입국·경유 조건은 「입국 조건」 탭에서 확인합니다.', 'Entry and transit rules are checked on the Entry tab.'))) + '</p>';
    scr(html);
    $('#scr').querySelectorAll('[data-ck]').forEach(function (b) { b.onclick = function () { judgeCheck(b.dataset.ck, b.dataset.v); }; });
    if ($('#cmp')) $('#cmp').onclick = comparePhoto;
    bindRe();
    var ph = $('#scr .pp .ph'); if (ph) { ph.style.cursor = 'zoom-in'; ph.title = tx(L('拡大', '확대', 'Zoom')); ph.onclick = function () { zoomPhoto(p); }; }
  }
  /* 여권 사진 확대(힌트가 아님 — 감점·제한 없음) */
  function zoomPhoto(p) {
    var z = document.createElement('div'); z.className = 'zoomov'; z.innerHTML = '<div class="zbox">' + STG.portrait(p, 'large') + '<span class="small">' + esc(tx(L('タップで閉じる', '탭하면 닫힘', 'Tap to close'))) + '</span></div>';
    z.onclick = function () { z.remove(); }; document.body.appendChild(z);
  }
  /* 발권 전이라면 판정을 다시 할 수 있음(Day 2~). 처음 판단이 틀렸다가 발권 전에 바로잡으면 안전 누락이 아니라 「자가 수정」으로 기록 */
  function reBtn(k) { var c = S.cur; return S.adv && !c.bp && !c.flags.denied && !(k === 'ticketName' && c.flags.nameFixed) ? ' <button class="btn ghost rebtn" data-re="' + k + '">' + esc(tx(L('もう一度確認', '다시 확인', 'Check again'))) + '</button>' : ''; }
  function bindRe() { $('#scr').querySelectorAll('[data-re]').forEach(function (b) { b.onclick = function () { reCheck(b.dataset.re); }; }); }
  function selfFix(c, code) { if (c.selfFix.indexOf(code) < 0) c.selfFix.push(code); }
  /* 행동 이력(기록용): 처음 오판 → 다시 확인 → 바로잡음 / 다시 오판 → 미해결 발권 */
  function act(c, code, ev) { (c.acts[code] = c.acts[code] || []).push(ev); }
  /* 24차b(GPT 24-F03): 열린 대화창의 선택지가 실행될 때, 그 창을 연 승객이 아직 지금 승객이고 근무 중이며 발권 전인지 확인 */
  function canEdit(c) { return !!(S && c && S.cur === c && G.screen === 'play' && !c.bp); }
  /* 「다시 확인」은 정정 시도의 시작일 뿐 — 올바른 처리(보류·SV·서류 확인)가 끝났을 때만 자가 수정 성공으로 확정 */
  function tryFix(c, code) { c.fixTry[code] = true; act(c, code, 'recheck'); }
  function fixDone(c, code) { if (c.fixTry[code]) { delete c.fixTry[code]; selfFix(c, code); act(c, code, 'corrected'); } }
  function missCode(k) { return k === 'validity' ? 'pp-expired' : k === 'entry' ? (has(S.cur.p, 'noEsta') ? 'esta-missing' : 'entry-miss') : k + '-miss'; }
  function reCheck(k) {
    var c = S.cur; if (!c || c.bp || c.flags.denied) return;
    if (c.flags['missed_' + k]) { c.flags['missed_' + k] = false; tryFix(c, missCode(k)); }
    if (k === 'photo' && c.flags.idWrong) { c.flags.idWrong = false; tryFix(c, 'id-mismatch'); }
    if (k === 'conn') c.flags.connKeep = false;
    if (k === 'entry' && c.flags.estaSkip) { c.flags.estaSkip = false; if (!c.flags.estaChecked) tryFix(c, 'esta-check'); }
    delete c.chk[k]; addTime(.3); sfx.tap();
    if (c.tab === 'pp') tabPP(); else tabEntry(); renderTabs();
  }
  function judgeCheck(k, v) {
    var c = S.cur, t = truth(k);
    addTime(.2);
    if (v === 'ok' && t === 'ok') { c.chk[k] = 'ok'; sfx.tap(); if (k === 'entry' && c.p.conn && !c.flags.estaChecked) { c.flags.estaSkip = true; act(c, 'esta-check', 'marked-ok-before-esta'); } }
    else if (v === 'ng' && t === 'ng' && k === 'conn') { sfx.ng(); return decideConn(); }
    else if (v === 'ng' && t === 'ok' && k === 'conn') { c.chk.conn = 'ok'; c.flags.connOver = true; mood(-8); addTime(1.5); sfx.ng(); note('bad', function () { return tx(L('遅延後の乗り継ぎ時間は' + connLeft(c.p) + '分で、MCT（' + c.p.conn.mct + '分）以上でした。乗り継げる便を「接続できない」として、必要のない予約変更を案内しかけました。', '지연 후 연결 시간은 ' + connLeft(c.p) + '분으로 MCT(' + c.p.conn.mct + '분) 이상이었습니다. 연결 가능한 편을 「연결 불가」로 해서 필요 없는 예약 변경을 안내할 뻔했습니다.', 'After the delay the connection time was ' + connLeft(c.p) + ' min, at or above the MCT (' + c.p.conn.mct + ' min). You treated a workable connection as missed and nearly offered a needless rebooking.')); }, 'passenger/1-4', 'conn-over'); }
    else if (v === 'ng' && t === 'ng') { sfx.ng(); if (k === 'ticketName') return decideName(); if (k === 'validity') return decideExpired(); if (k === 'entry') return has(c.p, 'noEsta') ? decideEsta() : decideVisa(); }
    else if (v === 'ng' && t === 'ok' && k === 'validity') { c.chk[k] = 'ok'; mood(-10); addTime(1.5); sfx.ng(); note('bad', function () { return tx(L('有効期限は復路の日まで有効でした。残りが短いというだけで「問題あり」にしてはいけません（今回の旅程で条件を満たすかを確認）。', '유효기간은 귀국일까지 유효했습니다. 남은 기간이 짧다는 이유만으로 「문제 있음」으로 하면 안 됩니다(이번 여정에서 조건을 충족하는지 확인).', 'The passport was valid through the return date. A short remaining validity alone is not a problem — check whether this itinerary meets the conditions.')); }, 'passenger/1-3', 'over-reject'); }
    else if (v === 'ng' && t === 'ok') { c.chk[k] = 'ok'; mood(-8); addTime(1.5); sfx.ng(); note('bad', function () { return tx(L('問題のない項目を「問題あり」にして、お客様を待たせました。', '문제없는 항목을 「문제 있음」으로 해서 승객을 기다리게 했습니다.', 'You flagged an item that was fine and kept the passenger waiting.')); }, 'passenger/1-3'); }
    else { c.chk[k] = 'ok'; c.flags['missed_' + k] = true; act(c, missCode(k), c.fixTry[missCode(k)] ? 'judged-ok-again' : 'judged-ok'); sfx.tap(); } /* 놓침 → 나중에 결과로 나타남 */
    if (c.tab === 'pp') tabPP(); else tabEntry(); renderTabs();
  }
  /* 이름 정정: 예약(PNR)의 이름을 여권과 같게 고침. rebook=새 예약(예약번호도 바뀜) */
  function fixName(c, rebook) {
    fixDone(c, 'ticketName-miss');
    var p = c.p; c.flags.nameFixed = true; c.flags.nameWas = c.flags.nameWas || (p.pnr.sur + '/' + p.pnr.given);
    p.pnr.sur = p.pp.sur; p.pnr.given = p.pp.given;
    if (rebook) { p.pnr.rloc = p.pnr.rloc.slice(0, 4) + 'R' + p.pnr.rloc.slice(5); c.flags.rebooked = true; }
  }
  function decideName() {
    var c = S.cur, p = c.p, ap = R.airline.VELA; say('me', D.nameDiff);
    modal(L('予約と旅券の名前が違います', '예약과 여권의 이름이 다릅니다', 'The booking and passport names differ'),
      tx(L('旅券：', '여권: ', 'Passport: ')) + p.pp.sur + '/' + p.pp.given + '　PNR：' + p.pnr.sur + '/' + p.pnr.given,
      L('名前が一致しないまま搭乗券を出すと、事前旅客情報（API）の不一致で到着地の入国審査で止められることがあります。', '이름이 일치하지 않은 채 탑승권을 발행하면 사전 승객 정보(API) 불일치로 도착지 입국심사에서 막힐 수 있습니다.', 'If you issue a boarding pass with mismatched names, the API data will not match and the passenger may be stopped at arrival immigration.'),
      [{ id: 'resv', t: L('予約部門に連絡し、規定にそって綴りを訂正してもらう', '예약 부서에 연락해 규정에 따라 철자를 정정한다', 'Call reservations and have the spelling corrected under the rules'), s: L('Vela Air 規定（教育用）：3文字以内の綴り違いは確認のうえ訂正できる ／ 約4分', 'Vela Air 규정(교육용): 3글자 이내 철자 오류는 확인 후 정정 가능 / 약 4분', 'Vela Air rule (training): spelling errors of up to 3 letters can be corrected after checks / ~4 min'),
        run: function () { addTime(4); mood(-3); fixName(c); c.chk.ticketName = 'ok'; say('pax', p.say.fix); note('good', function () { return tx(L('名前の不一致に気づき、規定どおり訂正してから手続きしました。', '이름 불일치를 알아차리고 규정대로 정정한 뒤 수속했습니다.', 'You caught the name mismatch and had it corrected by the book before continuing.')); }, 'ciq/0-4'); } },
       { id: 'sv', t: L('スーパーバイザー（SV）に相談する', '수퍼바이저(SV)에게 상담한다', 'Ask your supervisor (SV)'), s: L('SVが予約部門と調整 ／ 約2分、SVの時間を使う', 'SV가 예약 부서와 조정 / 약 2분, SV의 시간을 씀', 'The SV sorts it out with reservations / ~2 min, uses the SV\'s time'),
        run: function () { addTime(2); mood(-2); fixName(c); c.chk.ticketName = 'ok'; say('pax', p.say.fix); note('good', function () { return tx(L('名前の不一致に気づき、SVと一緒に訂正しました。', '이름 불일치를 알아차리고 SV와 함께 정정했습니다.', 'You caught the name mismatch and fixed it with your supervisor.')); }, 'passenger/1-3'); } },
       { id: 'rebook', t: L('お客様に予約を取り直してもらう', '승객에게 예약을 다시 하라고 한다', 'Tell the passenger to make a new booking'), s: L('規定上は可能だが、お客様の負担が大きい', '규정상 가능하지만 승객 부담이 큼', 'Allowed, but a heavy burden on the passenger'),
        run: function () { addTime(1); mood(-30); fixName(c, true); c.chk.ticketName = 'ok'; say('pax', p.say.rebook); note('bad', function () { return tx(L('訂正できる綴り違いだったのに、予約の取り直しを求めました。', '정정할 수 있는 철자 오류였는데 예약을 다시 하게 했습니다.', 'It was a correctable typo, but you made the passenger rebook.')); }, 'passenger/1-3'); } },
       { id: 'issue', t: L('このまま搭乗券を出す', '그대로 탑승권을 발행한다', 'Issue the boarding pass as is'), lock: L('できません：旅券と予約の名前が一致しないまま発券しない（API・入国審査）', '할 수 없음: 여권과 예약 이름이 다른 채로 발권하지 않음(API·입국심사)', 'Not allowed: never issue with mismatched names (API, immigration)') }],
      'ciq/0-4', function () { tabPP(); renderTabs(); });
  }

  /* 입국 조건 */
  function tabEntry() {
    var c = S.cur, p = c.p, dest = V.destC;
    var html = '<div class="h3">' + esc(tx(S.adv ? L('教育用 入国条件の照会', '교육용 입국 조건 조회', 'Entry requirement lookup (training)') : L('渡航条件の照会', '입국 조건 조회', 'Entry requirement lookup'))) + '</div>' +
      '<div class="mono small">&gt; TI ' + p.pp.nat + (p.conn ? ' / TRANSIT ' + dest + ' / DEST US' : ' / DEST ' + (dest === 'KR' ? 'KR' : 'JP') + ' / ' + esc(tx(L('短期滞在', '단기 체류', 'short stay')))) + '</div>';
    if (!c.entryQ) {
      html += '<div class="btns"><button class="btn pri" id="q">' + esc(tx(L('照会する', '조회', 'Look up'))) + '</button></div>';
    } else {
      if (p.conn) return tabEntryThru(c, p, dest, html);
      var r = R.entryDB[dest][p.pp.nat];
      var lab = { free: L('査証免除（短期滞在）', '비자 면제(단기 체류)', 'Visa-free (short stay)'), citizen: L('自国民（査証の確認は不要・旅券は確認）', '자국민(비자 확인 불필요·여권은 확인)', 'Citizen (no visa check; passport still checked)'), visa: L('査証（ビザ）が必要 ― 有効な査証を確認すること', '비자 필요 — 유효한 비자를 확인할 것', 'Visa required — check for a valid visa') }[r];
      html += '<div style="margin-top:10px"><span class="pill ' + (r === 'visa' ? 'warn' : 'ok') + '">' + esc(tx(lab)) + '</span></div>';
      if (p.visa) html += '<p class="small" style="margin-top:8px">' + esc(tx(L('旅券の査証欄を「旅券」タブで確認できます。今日の日付は', '여권의 비자 면은 「여권」 탭에서 볼 수 있습니다. 오늘 날짜는', 'You can see the visa page on the Passport tab. Today is'))) + ' <b class="mono">' + M.date + '</b></p>';
      var v = c.chk.entry;
      html += '<div class="chk"><div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap"><span style="flex:1;min-width:140px">' + esc(tx(L('入国・通過の条件を満たしている', '입국·경유 조건을 충족한다', 'Meets the entry and transit requirements'))) + '</span>' +
        (v ? '<span class="pill ' + (v === 'ok' ? 'ok' : 'ng') + '">' + esc(tx(v === 'ok' ? T.ok : T.ng)) + '</span>' + reBtn('entry') : '<button class="btn" style="padding:6px 10px" data-ck="entry" data-v="ok">' + esc(tx(T.ok)) + '</button><button class="btn warnb" style="padding:6px 10px" data-ck="entry" data-v="ng">' + esc(tx(T.ng)) + '</button>') + '</div></div>';
    }
    html += '<div class="edu">' + esc(tx(T.eduData)) + '</div>';
    scr(html);
    if ($('#q')) $('#q').onclick = function () { c.entryQ = true; addTime(M.cost.entry); sfx.tap(); tabEntry(); renderTabs(); };
    bindRe();
    $('#scr').querySelectorAll('[data-ck]').forEach(function (b) { b.onclick = function () { judgeCheck(b.dataset.ck, b.dataset.v); }; });
  }
  /* 스루 체크인: 환승지(입국하지 않음) + 최종 목적지 미국(VWP 이용 사례 → ESTA 승인 필요) */
  function tabEntryThru(c, p, dest, html) {
    var ap = dest === 'KR' ? 'ICN' : 'NRT';
    html += '<div class="chk" style="margin-top:8px">' +
      '<div><span class="pill ok">' + ap + '</span> ' + esc(tx(L('乗り継ぎのみ（入国しない）― 同じ航空券・連帯運送の契約で最終目的地まで手続き可能（教育用）', '환승만(입국하지 않음) — 같은 항공권·연대운송 계약으로 최종 목적지까지 수속 가능(교육용)', 'Transit only (no entry) — same ticket and through-check agreement, so check-in to the final destination is possible (training)'))) + '</div>' +
      '<div><span class="pill warn">HNL · US</span> ' + esc(tx(L('ビザ免除プログラム（VWP）で渡航する場合は、承認済みのESTAが必要。目的に合う有効な米国ビザで渡航する場合はESTA不要。', '비자 면제 프로그램(VWP)으로 가는 경우 승인된 ESTA가 필요. 목적에 맞는 유효한 미국 비자로 가는 경우 ESTA 불필요.', 'Travelling under the Visa Waiver Program (VWP) requires an approved ESTA. Not needed if travelling on a valid US visa for that purpose.'))) + '</div></div>';
    html += '<div class="btns" style="margin-top:6px">' + (c.flags.estaChecked ? '<span class="pill ' + (p.conn.esta === 'approved' ? 'ok' : 'ng') + '">ESTA: ' + esc(tx(p.conn.esta === 'approved' ? L('承認済み（AUTHORIZATION APPROVED）', '승인 완료(AUTHORIZATION APPROVED)', 'Approved (AUTHORIZATION APPROVED)') : L('承認なし（申請記録なし）・米国ビザもなし', '승인 없음(신청 기록 없음)·미국 비자도 없음', 'Not approved (no application) · no US visa'))) + '</span>' : '<button class="btn" id="esta">' + esc(tx(L('ESTA・米国ビザの有無を確認する', 'ESTA·미국 비자 유무 확인', 'Check ESTA / US visa'))) + '</button>') + '</div>';
    if (S.delay) html += connPanel(c, p);
    var v = c.chk.entry;
    html += '<div class="chk"><div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap"><span style="flex:1;min-width:140px">' + esc(tx(L('乗り継ぎ地と最終目的地の条件を満たしている', '환승지와 최종 목적지의 조건을 충족한다', 'Meets the transit and final-destination requirements'))) + '</span>' +
      (v ? '<span class="pill ' + (v === 'ok' ? 'ok' : 'ng') + '">' + esc(tx(v === 'ok' ? T.ok : T.ng)) + '</span>' + reBtn('entry') : '<button class="btn" style="padding:6px 10px" data-ck="entry" data-v="ok">' + esc(tx(T.ok)) + '</button><button class="btn warnb" style="padding:6px 10px" data-ck="entry" data-v="ng">' + esc(tx(T.ng)) + '</button>') + '</div></div>';
    html += '<div class="edu">' + esc(tx(L('教育用データ（2026年10月11日に公式情報を確認）― 実務では Timatic・公式情報・自社の連帯運送契約で確認します', '교육용 데이터(2026년 10월 11일 공식 정보 확인) — 실무에서는 Timatic·공식 정보·자사 연대운송 계약으로 확인합니다', 'Training data (official sources checked 11 Oct 2026) — in real work, check Timatic, official sources and your interline agreements'))) + '</div>';
    scr(html);
    if ($('#esta')) $('#esta').onclick = function () { c.flags.estaChecked = true; if ((c.flags.estaSkip || c.fixTry['esta-check']) && !c.bp) { c.flags.estaSkip = false; c.fixTry['esta-check'] = true; fixDone(c, 'esta-check'); } addTime(.6); sfx.tap(); say('pax', p.say.esta); tabEntry(); };
    $('#scr').querySelectorAll('[data-ck]').forEach(function (b) { b.onclick = function () { judgeCheck(b.dataset.ck, b.dataset.v); }; });
    bindRe();
  }
  function decideVisa() {
    var c = S.cur, p = c.p;
    say('me', D.visaNg); say('pax', p.say.plea);
    modal(L('査証の有効期限が切れています', '비자 유효기간이 지났습니다', 'The visa has expired'),
      'Valid until ' + p.visa.until + ' / Today ' + M.date,
      L('有効な書類がないお客様は運べません。到着地で入国を拒否されると、送還の費用と違反通知の対象になります。現場で例外は作りません。', '유효한 서류가 없는 승객은 운송할 수 없습니다. 도착지에서 입국이 거부되면 송환 비용과 위반 통지의 대상이 됩니다. 현장에서 예외를 만들지 않습니다.', 'You cannot carry a passenger without valid documents. A refusal at arrival means removal costs and an infringement notice. No exceptions at the counter.'),
      [{ id: 'sv', t: L('理由を説明し、SVに引き継いで判断と経緯を記録する', '이유를 설명하고 SV에게 인계해 판단과 경위를 기록한다', 'Explain why, hand over to the SV and record the decision'), s: L('規定を確認 → 説明 → 上席へ → 記録 ／ 約4分', '규정 확인 → 설명 → 상급자 → 기록 / 약 4분', 'Check the rule → explain → escalate → record / ~4 min'),
        run: function () { addTime(4); mood(-15); c.chk.entry = 'ng'; c.flags.denied = true; c.flags.handover = true; note('good', function () { return tx(L('期限切れの査証に気づき、搭乗をお断りしてSVに引き継ぎ、記録を残しました。', '기한이 지난 비자를 알아차리고 탑승을 거절한 뒤 SV에게 인계하고 기록을 남겼습니다.', 'You spotted the expired visa, refused boarding, handed over to the SV and kept a record.')); }, 'passenger/1-3'); } },
       { id: 'self', t: L('自分で搭乗できないと伝え、帰っていただく', '직접 탑승 불가를 전하고 돌려보낸다', 'Tell the passenger yourself and send them away'), s: L('判断は正しいが、上席への引き継ぎと記録がない', '판단은 맞지만 상급자 인계와 기록이 없음', 'Right call, but no escalation or record'),
        run: function () { addTime(2); mood(-30); c.chk.entry = 'ng'; c.flags.denied = true; note('bad', function () { return tx(L('搭乗をお断りした判断は正しいものの、SVへの引き継ぎと記録がありませんでした。', '탑승 거절 판단은 맞았지만 SV 인계와 기록이 없었습니다.', 'Refusing was right, but you skipped the handover to the SV and the record.')); }, 'passenger/1-3'); } },
       { id: 'issue', t: L('2日だけなので搭乗券を出す', '이틀뿐이니 탑승권을 발행한다', 'It is only two days — issue the boarding pass'), lock: L('できません：有効な査証がないお客様は運送しない（入国拒否・送還・違反通知）', '할 수 없음: 유효한 비자가 없는 승객은 운송하지 않음(입국 거부·송환·위반 통지)', 'Not allowed: no valid visa, no carriage (refusal, removal, infringement notice)') }],
      'ciq/1-4', function () { if (c.flags.denied) { endPax(true); } else { tabEntry(); renderTabs(); } });
  }

  /* 좌석 */
  function tabSeat() {
    if (!S || !S.cur || G.screen !== 'play' || !$('#scr')) return;   /* 25차(24b-R02): 근무 화면이 아니면 그리지 않음 */
    var c = S.cur, p = c.p, ac = ACFT();
    var infTalk = !c.seatAsked && !c.bp && p.inf && p.pnr && p.pnr.req === 'exit' && !c.flags.exitExplained;
    if (infTalk) infantExitTalk(c);   /* 27차: 상태(설명함·좌석 제안·노트·시간)는 좌석 탭을 처음 열 때 바로 확정 — 조작 속도에 따라 결과가 달라지지 않게. 말은 아래에서 승객 요청 뒤에 */
    if (c.vol) { scr('<div class="h3">' + esc(tx(L('座席', '좌석', 'Seat'))) + '</div><p>' + esc(tx(L('代替便 ', '대체편 ', 'Alternative flight '))) + '<b class="mono">' + V.alt.flight + ' ' + V.alt.dep + '</b> · ' + esc(tx(L('座席はSVが確保済み：', '좌석은 SV가 확보함: ', 'Seat held by the SV: '))) + '<b class="mono">' + c.seat + '</b></p>'); return; }
    var html = '<div class="h3">' + esc(tx(L('座席を選ぶ', '좌석 선택', 'Choose a seat'))) + ' <span class="small">' + esc(tx(ACFT().nm || L('Vela 教育用 A配置（30列・180席）', 'Vela 교육용 A 배치(30열·180석)', 'Vela training layout A (30 rows, 180 seats)'))) + ' · Y</span></div>' + (p.sup && p.sup.type === 'um' ? velaRule(umRuleText()) : '') + '<div class="seatwrap"><div class="seatmap">';
    var umHi = !!(p.sup && p.sup.type === 'um' && G.hints), umSet = (p.sup && p.sup.type === 'um') ? (R3().umSeats || []) : [];
    for (var r = 1; r <= ac.rows; r++) {
      if (r === 13) { /* 13 skip none */ }
      html += '<div class="rn">' + r + '</div>';
      for (var i = 0; i < 6; i++) {
        if (i === 3) html += '<div></div>';
        var id = r + ac.cols[i], cls = 'seat', dis = '';
        if (ac.inop.indexOf(id) >= 0) { cls += ' inop'; dis = 'disabled'; }
        else if (S.seats.indexOf(id) >= 0 && c.seat !== id && (c.famSeats || []).indexOf(id) < 0) { cls += ' taken'; dis = 'disabled'; }
        if (ac.exitRows.indexOf(r) >= 0) cls += ' exit';
        if (S.infantSeats.indexOf(id) >= 0) cls += ' inf';
        if (umHi && umSet.indexOf(id) >= 0) cls += ' um';
        if (c.seat === id || (c.famSeats || []).indexOf(id) >= 0) cls += ' sel';
        html += '<button class="' + cls + '" data-seat="' + id + '" ' + dis + ' aria-label="' + id + '">' + ac.cols[i] + '</button>';
      }
    }
    html += '</div></div><div class="legend"><span><em style="background:#2b5f6b"></em>' + esc(tx(L('空席', '빈 좌석', 'Free'))) + '</span><span><em style="background:#33434a"></em>' + esc(tx(L('指定済み', '배정됨', 'Taken'))) + '</span><span><em style="background:#2b5f6b;box-shadow:inset 0 -4px 0 #ffcf6b"></em>' + esc(tx(L('非常口座席', '비상구 좌석', 'Exit row'))) + '</span><span><em style="background:#2b5f6b;outline:2px solid #a78bfa"></em>' + esc(tx(L('幼児連れ', '유아 동반', 'With infant'))) + '</span><span><em style="background:repeating-linear-gradient(45deg,#4a1e1c 0 4px,#33434a 4px 8px)"></em>INOP</span>' + (umHi ? '<span><em class="umk"></em>' + esc(tx(L('UM指定席', 'UM 지정석', 'UM seats'))) + '</span>' : '') + '</div>';
    if (p.party) { var fn = famNames(p), fs = c.famSeats || []; html += '<div class="chk" style="margin-top:6px">' + fn.map(function (n, i) { return '<div class="small">' + (i === fs.length ? '▶ ' : '') + esc(n) + ' : <b class="mono">' + (fs[i] || '—') + '</b></div>'; }).join('') + (fs.length ? '<button class="btn ghost" id="famre" style="margin-top:4px">' + esc(tx(L('選び直す', '다시 고르기', 'Choose again'))) + '</button>' : '') + '</div>'; }
    if (p.sup && p.sup.type === 'pet') html += velaRule(L('PETCの座席：窓側（1列目・非常口は不可）', 'PETC 좌석: 창가(1열·비상구 불가)', 'PETC seats: window (not row 1 or exit rows)'));
    if (p.pnr.req) html += '<p class="small" style="margin-top:6px">' + esc(tx(L('お客様の希望', '승객 희망', 'Request'))) + ': ' + esc(tx({ window: L('窓側', '창가', 'window'), aisle: L('通路側', '통로', 'aisle'), exit: L('非常口座席', '비상구 좌석', 'exit row') }[p.pnr.req])) + '</p>';
    /* 24차(사용자 지적): 비상구를 원하지만 앉을 수 없는 승객 — 다른 자리를 고르기 전에 이유를 설명하고 대안을 안내해야 함(말없이 다른 자리로 배정하면 업무 감점) */
    if (exitReqBanned(p) && !c.bp) html += c.flags.exitExplained ? '<p class="small" style="margin-top:4px"><span class="pill ok">' + esc(tx(L('非常口のご希望：理由を説明済み', '비상구 희망: 이유 설명함', 'Exit row request: reason explained'))) + '</span></p>' :
      '<div class="must" style="margin-top:6px"><div><b>' + esc(tx(L('ご希望への対応が必要', '희망에 대한 응대 필요', 'This request needs an answer'))) + '</b> ' + esc(tx(L('このお客様は非常口座席に座れません。断る理由を説明し、近い条件の席を案内します。', '이 승객은 비상구 좌석에 앉을 수 없습니다. 안 되는 이유를 설명하고 조건이 비슷한 자리를 안내합니다.', 'This passenger cannot sit in an exit row. Explain why and offer a similar seat.'))) + '</div></div><div class="btns"><button class="btn pri" id="exitex">' + esc(tx(L('理由を説明し、ほかの席を案内する', '이유를 설명하고 다른 자리를 안내한다', 'Explain why and offer another seat'))) + '</button></div>';
    scr(html);
    if (!c.seatAsked) { c.seatAsked = true; say('me', D.seatAsk); say('pax', p.say.seat);
      /* 27차(사용자 10-14): 유아 동반 승객이 비상구를 원하면, 직원이 바로 이유를 말하고 지금 비어 있는 앞쪽 통로 좌석 2곳을 구체적으로 안내 */
      if (infTalk) { var me3 = c; setTimeout(function () { if (S.cur === me3 && G.screen === 'play') infantExitSay(me3); }, 1100); } }
    /* 22차: 발권 후에는 좌석을 바꾸지 않음(탑승권에 이미 좌석이 인쇄됨 — 지원 탭의 발권 후 잠금과 같은 기준) */
    if (c.bp) { $('#scr').querySelectorAll('[data-seat], #famre').forEach(function (b) { b.disabled = true; b.onclick = null; }); $('#scr').insertAdjacentHTML('beforeend', '<p class="small" style="color:var(--termwarn)">' + esc(tx(L('発券後は座席を変えられません（変更は搭乗券の無効化と再発券が必要）。', '발권 후에는 좌석을 바꿀 수 없습니다(변경하려면 탑승권 무효화와 재발권이 필요합니다).', 'After issue, the seat is locked (a change would need the boarding pass cancelled and reissued).'))) + '</p>'); }
    else $('#scr').querySelectorAll('[data-seat]').forEach(function (b) { b.onclick = function () { pickSeat(b.dataset.seat); }; });
    if ($('#famre') && !c.bp) $('#famre').onclick = famReset;
    if ($('#exitex')) $('#exitex').onclick = function () { explainExit(c, p); tabSeat(); renderTabs(); };   /* 24차 B-R01: 발권 뒤에는 다시 고르기 연결 안 함 */
  }
  function pickSeat(id) {
    var c = S.cur, p = c.p, ac = ACFT(), row = parseInt(id, 10), col = id.slice(-1);
    if (c.bp) return;   /* 24차 B-R01: 발권 뒤 좌석 변경 함수 자체도 막음(버튼 잠금과 별도의 안전장치) */
    var block = 'ABC'.indexOf(col) >= 0 ? 'L' : 'R';
    if (ac.exitRows.indexOf(row) >= 0 && exitBan(p)) return exitBanModal(id);
    if (p.party) return famPick(id);
    if (p.sup && p.sup.type === 'um' && (R3().umSeats || []).indexOf(id) < 0 && !c.umForce) return umOutModal(id);
    if (ac.exitRows.indexOf(row) >= 0) {
      if (p.inf) {
        sfx.ng(); c.exitTried = true; say('me', D.exitNo);
        return modal(L('非常口座席には座れません', '비상구 좌석에 앉을 수 없습니다', 'Not allowed in an exit row'), id,
          L('非常口座席のお客様は、緊急時に乗務員を手伝う役割があります。幼児・小児連れのお客様、15歳未満の方などは座れません。', '비상구 좌석 승객은 비상시 승무원을 돕는 역할을 합니다. 유아·소아 동반 승객, 15세 미만 등은 앉을 수 없습니다.', 'Exit row passengers may have to help the crew in an emergency. Passengers with infants or children, under-15s and others may not sit there.'),
          [{ id: 'ex', t: L('理由を説明して、ほかの座席を案内する', '이유를 설명하고 다른 좌석을 안내한다', 'Explain why and offer another seat'), s: L('前方の通路側など、希望に近い席を探す', '앞쪽 통로 등 희망에 가까운 자리를 찾는다', 'Look for something close to the request, like a front aisle seat'),
            run: function () { if (!canEdit(c)) return; mood(-4); c.flags.exitExplained = true; say('pax', p.say.exitNoReply || p.say.seatOk); note('good', function () { return tx(L('幼児連れのお客様に非常口座席を割り当てず、理由を説明しました。', '유아 동반 승객에게 비상구 좌석을 배정하지 않고 이유를 설명했습니다.', 'You did not give the exit row to a passenger with an infant, and explained why.')); }, 'passenger/1-5'); } },
           { id: 'force', t: L('ご希望どおり非常口座席にする', '희망대로 비상구 좌석으로 한다', 'Give them the exit row as asked'), lock: L('できません：幼児連れのお客様は非常口座席に座れない', '할 수 없음: 유아 동반 승객은 비상구 좌석에 앉을 수 없음', 'Not allowed: passengers with infants cannot sit in exit rows') }],
          'passenger/1-5', function () { tabSeat(); });
      }
      say('me', D.exitExplain);
      return modal(L('非常口座席の条件確認', '비상구 좌석 조건 확인', 'Exit row check'), id,
        L('非常口座席は、条件（15歳以上、脱出を手伝える体力、乗務員の指示を理解できる等）を口頭で確認して同意を得たうえで、案内文にご署名をいただいてから割り当てます（Vela Air 教育用の規定）。', '비상구 좌석은 조건(15세 이상, 탈출을 도울 체력, 승무원 지시 이해 등)을 구두로 확인해 동의를 받고, 안내문에 서명을 받은 뒤 배정합니다(Vela Air 교육용 규정).', 'Confirm the conditions out loud (15 or older, able to help with the evacuation, can understand crew instructions), get consent, and have the passenger sign the information card before assigning (Vela Air training rule).'),
        [{ id: 'cf', t: L('条件を説明し、同意を得る', '조건을 설명하고 동의를 받는다', 'Explain the conditions and get consent'), s: L('次に案内文への署名', '다음은 안내문 서명', 'Next: sign the card'), run: function () { if (!canEdit(c)) return; addTime(.5); say('pax', p.say.exitYes); c.flags.exitAgreed = true; setTimeout(function () { if (canEdit(c)) exitSignModal(id); }, 30); } },
         { id: 'skip', t: L('確認せずに割り当てる', '확인 없이 배정한다', 'Assign without checking'), lock: L('できません：条件の確認と同意なしに非常口座席を割り当てない', '할 수 없음: 조건 확인과 동의 없이 비상구 좌석을 배정하지 않음', 'Not allowed: never assign an exit row without the check and consent') },
         { id: 'no', t: L('やめて別の席にする', '그만두고 다른 자리로', 'Cancel and pick another seat'), run: function () {} }],
        'passenger/1-5', function () { tabSeat(); renderTabs(); });
    }
    if (p.inf) {
      var clash = S.infantSeats.some(function (s) { var r2 = parseInt(s, 10), b2 = 'ABC'.indexOf(s.slice(-1)) >= 0 ? 'L' : 'R'; return r2 === row && b2 === block; });
      if (clash) {
        sfx.ng();
        return modal(L('同じ列の幼児連れが重なります', '같은 열에 유아 동반이 겹칩니다', 'Two infants in the same block'), id,
          L('列ごとに予備の酸素マスクの数が決まっているため、幼児連れのお客様は同じ列（左右のブロック）に集めず分散させます。', '열마다 예비 산소마스크 수가 정해져 있어, 유아 동반 승객은 같은 열(좌우 블록)에 모으지 않고 분산합니다.', 'Each row block has a fixed number of spare oxygen masks, so passengers with infants are spread out, not put in the same block.'),
          [{ id: 'ok', t: L('別の列にする', '다른 열로 한다', 'Choose another row'), run: function () { note('info', function () { return tx(L('幼児連れのお客様を分散させました。', '유아 동반 승객을 분산했습니다.', 'You spread out the passengers with infants.')); }, 'passenger/1-5'); } }],
          'passenger/1-5', function () { tabSeat(); });
      }
    }
    setSeat(id);
  }
  /* 22차: UM 지정석 밖을 누르면 배정 전에 안내. 다시 고르면 좌석·만족도·시간·기록을 바꾸지 않음(기존 좌석 그대로) */
  function umOutModal(id) {
    var c = S.cur; sfx.ng();
    return modal(L('UM指定席ではありません', 'UM 지정석이 아닙니다', 'Not a UM seat'), id,
      L('Vela 教育用規定では、UMのお子様は乗務員が見守りやすい ' + umRange().ja + ' に座っていただきます。', 'Vela 교육용 규정에서 UM 어린이는 승무원이 지켜보기 쉬운 ' + umRange().ko + '에 앉힙니다.', 'Under the Vela training rule, UM children sit where the crew can keep an eye on them: ' + umRange().en + '.'),
      [{ id: 're', t: L('指定席から選び直す', '지정석에서 다시 고르기', 'Choose again from the UM seats'), run: function () {} },
       { id: 'force', t: L('この座席で割り当てる（規定外）', '이 좌석으로 배정한다(규정 밖)', 'Assign this seat anyway (outside the rule)'), run: function () { if (!canEdit(c)) return; c.umForce = true; try { pickSeat(id); } finally { c.umForce = false; } } }],
      'passenger/1-7', function () { tabSeat(); renderTabs(); });
  }
  function setSeat(id, quiet) {
    var c = S.cur, p = c.p, col = id.slice(-1), row = parseInt(id, 10);
    if (!canEdit(c)) return;   /* 24차b(GPT 24-F03): 발권 뒤에는 어떤 경로로도 좌석을 바꾸지 않음(Day 4 재배정은 별도 경로) */
    if (ACFT().exitRows.indexOf(row) < 0) c.flags.exitOK = false;
    if (c.seat) { S.seats.splice(S.seats.indexOf(c.seat), 1); if (p.inf) S.infantSeats.splice(S.infantSeats.indexOf(c.seat), 1); }
    c.seat = id; S.seats.push(id); if (p.inf) S.infantSeats.push(id);
    addTime(M.cost.seat); sfx.tap();
    var want = p.pnr.req, good = (want === 'window' && /[AF]/.test(col)) || (want === 'aisle' && /[CD]/.test(col)) || (want === 'exit' && p.inf && /[CD]/.test(col) && row <= 7) || (want === 'exit' && !p.inf && ACFT().exitRows.indexOf(row) >= 0) || !want;
    if (p.pair) good = pairGood(p, id);
    if (p.sup && p.sup.type === 'um') good = R3().umSeats.indexOf(id) >= 0;
    if (p.sup && p.sup.type === 'pet') good = /[AF]/.test(col) && row !== 1;
    if (good) mood(+4); else mood(p.pair && p.pair.role === 'b' ? -12 : -4);
    c.seatGood = good;
    if (!quiet) { say('me', D.seatConfirm); say('pax', good ? p.say.seatOk : (p.sup && p.sup.type === 'um' && p.say.umSeatMeh) || p.say.seatMeh); }
    tabSeat(); renderTabs();
  }

  /* 일행 좌석: 같은 블록(ABC / DEF)에서 바로 옆 */
  function nextTo(id) { var r = parseInt(id, 10), col = id.slice(-1), cols = 'ABCDEF', i = cols.indexOf(col), out = []; [i - 1, i + 1].forEach(function (j) { if (j >= 0 && j < 6 && Math.floor(j / 3) === Math.floor(i / 3)) out.push(r + cols[j]); }); return out; }
  function pairGood(p, id) {
    var ac = ACFT();
    if (p.pair.role === 'a') return nextTo(id).some(function (n) { return S.seats.indexOf(n) < 0 && ac.inop.indexOf(n) < 0 && ac.exitRows.indexOf(parseInt(n, 10)) < 0; });
    var mate = S.results.filter(function (r) { return r.p.id === p.pair.mate; })[0];
    return !!(mate && mate.seat && nextTo(mate.seat).indexOf(id) >= 0);
  }
  /* 수하물 */
  function tabBag() {
    var c = S.cur, p = c.p, ap = R.airline.VELA;
    if (!c.bagSaid) { c.bagSaid = true; say('me', D.weigh); }
    var html = '<div class="h3">' + esc(tx(L('手荷物', '수하물', 'Bags'))) + ' <span class="small">' + esc(tx(L('無料：1個 23kg ／ 1個の上限 32kg（Vela Air 教育用）', '무료: 1개 23kg / 1개 상한 32kg (Vela Air 교육용)', 'Free: 1 piece 23kg / max 32kg per piece (Vela Air, training)'))) + '</span></div>';
    /* 보안 질문 */
    html += '<div class="panel" style="background:#0d2b35;border-color:#23444e;padding:10px;margin-bottom:10px"><div class="small" style="margin-bottom:6px">' + esc(tx(L('預ける荷物の保安質問', '위탁 수하물 보안 질문', 'Security questions for checked bags'))) + '</div>';
    if (!c.dg) html += '<button class="btn" id="dgq">' + esc(tx(L('3つの質問をする（自分で詰めたか・目を離したか・預かり物や危険物）', '세 가지 질문하기(직접 쌌는지·눈을 뗐는지·받은 물건이나 위험물)', 'Ask the 3 questions (packed it yourself, left unattended, items from others or dangerous goods)'))) + '</button>';
    else html += '<span class="pill ' + (p.dg === 'pb' ? 'warn' : 'ok') + '">' + esc(tx(p.dg === 'pb' ? L('モバイルバッテリーあり → 対応済み', '보조배터리 있음 → 처리 완료', 'Power banks found → handled') : L('該当なし', '해당 없음', 'Nothing to declare'))) + '</span>';
    html += '<div class="small" style="margin-top:6px">' + esc(tx(L('ライター・電池・スプレーなどは一律禁止ではなく、種類・容量・梱包によって「機内へ」「預け可」「運べない」が分かれます。見つかったら中身を確認します。', '라이터·배터리·스프레이 등은 일률적으로 금지가 아니라 종류·용량·포장에 따라 「기내로」「위탁 가능」「운송 불가」가 나뉩니다. 발견되면 내용을 확인합니다.', 'Lighters, batteries and sprays are not all banned: type, capacity and packing decide whether they go in the cabin, in the hold, or not at all. If found, check what they are.'))) + '</div>';
    html += '</div>';
    c.bags.forEach(function (b, i) {
      var bag = p.bags[i];
      var thru = p.conn && p.conn.esta === 'approved', dst = b.dest || V.to;
      html += '<div class="scale" style="margin-bottom:10px">' + (bag.stroller && !bag.prop ? '' : '<img class="bagthumb" src="' + STG.src(bag.prop || 'prop_luggage_01') + '" alt="">') + '<div><div class="small">' + esc(tx(bag.stroller ? L('ベビーカー', '유모차', 'Stroller') : bag.mob ? L('お客様の車いす（手動）', '승객의 휠체어(수동)', 'Own wheelchair (manual)') : bag.golf ? L('ゴルフバッグ', '골프백', 'Golf bag') : bag.conv ? L('預けに変えた機内用バッグ', '위탁으로 바꾼 기내 가방', 'Carry-on, now checked') : L('スーツケース', '캐리어', 'Suitcase'))) + ' ' + (i + 1) + '</div><div class="lcd">' + (b.w != null ? b.w.toFixed(1) : '--.-') + ' kg</div></div>' +
        (b.tag ? '<div class="tag"><span>VELA<br>' + dst + '</span><b>' + dst + '</b><span>' + b.tag + (bag.stroller ? '<br>INF·FREE' : bag.mob ? '<br>WCH·FREE' : '') + (b.fragile ? '<br>FRAGILE' : '') + '</span></div>' :
          (b.w == null ? '<button class="btn pri" data-w="' + i + '">' + esc(tx(L('はかりに載せる', '저울에 올리기', 'Put on the scale'))) + '</button>' :
            thru ? '<span class="btns" style="margin:0"><button class="btn" data-tg="' + i + '" data-dst="' + V.to + '">' + esc(tx(L('タグ：', '태그: ', 'Tag: '))) + V.to + '</button><button class="btn pri" data-tg="' + i + '" data-dst="' + p.conn.to + '">' + esc(tx(L('タグ：', '태그: ', 'Tag: '))) + p.conn.to + '</button></span>' :
            '<button class="btn pri" data-tg="' + i + '">' + esc(tx(L('タグを付けてベルトへ', '태그 달고 벨트로', 'Tag it and send it down the belt'))) + '</button>')) + '</div>';
    });
    if (S.adv) html += '<div class="scale" style="margin-bottom:10px"><img class="bagthumb" src="' + STG.src(c.flags.carryDone ? 'prop_cabin_bag_01' : p.carryProp || 'prop_cabin_bag_01') + '" alt=""><div><div class="small">' + esc(tx(L('機内持ち込み（Vela：1個＋身の回り品1個・合計10kg・55×40×25cm）', '기내 반입(Vela: 1개+개인 소지품 1개·합계 10kg·55×40×25cm)', 'Carry-on (Vela: 1 bag + 1 personal item, 10kg total, 55×40×25cm)'))) + '</div><div class="lcd">' + (c.carryW != null ? c.carryW.toFixed(1) : '--.-') + ' kg</div></div>' + (c.carryW == null ? '<button class="btn" id="cw">' + esc(tx(L('機内持ち込みを計る', '기내 가방 계량', 'Weigh the carry-on'))) + '</button>' : '') + '</div>';
    else html += '<p class="small">' + esc(tx(L('機内持ち込み', '기내 반입', 'Carry-on'))) + ': ' + p.carry.toFixed(1) + ' kg / ' + ap.cabinMaxKg + ' kg</p>';
    if (S.adv && !p.bags.length) html += '<p class="small">' + esc(tx(L('預ける荷物はありません。', '맡길 짐이 없습니다.', 'No checked bags.'))) + '</p>';
    /* 27차(사용자 10-14): 미국행 스루 수하물 — 첫 도착 공항에서 짐을 찾아 세관(신고는 승객 책임)·TSA 잠금 안내 */
    if (usThru(p) && p.bags.length) html += '<div class="chk" style="margin-top:8px"><b>' + esc(tx(L('米国行きの手荷物（最終目的地 ', '미국행 수하물(최종 목적지 ', 'US-bound bags (final destination ') + p.conn.to + ')')) + '</b> ' +
      (c.flags.usNote ? '<span class="pill ' + (c.flags.usNote === 'ok' ? 'ok' : 'warn') + '">' + esc(tx(c.flags.usNote === 'ok' ? L('ご案内済み', '안내함', 'Explained') : L('案内の内容に誤り', '안내 내용 오류', 'Wrong information given'))) + '</span>' : '<button class="btn" id="usn">' + esc(tx(L('米国行きの手荷物について案内する', '미국행 수하물 안내하기', 'Explain the US bag rules'))) + '</button>') + '</div>';
    scr(html);
    if ($('#usn')) $('#usn').onclick = usNotice;
    if ($('#cw')) $('#cw').onclick = weighCarry;
    if ($('#dgq')) $('#dgq').onclick = askDG;
    $('#scr').querySelectorAll('[data-w]').forEach(function (b) { b.onclick = function () { weigh(+b.dataset.w); }; });
    $('#scr').querySelectorAll('[data-tg]').forEach(function (b) { b.onclick = function () { tagBag(+b.dataset.tg, b.dataset.dst); }; });
  }
  function usThru(p) { return !!(p.conn && p.conn.to === 'HNL'); }   /* 교육용 데이터의 미국 공항(호놀룰루) */
  function usNotice() {
    var c = S.cur, p = c.p; if (!canEdit(c)) return;
    modal(L('米国行きの手荷物のご案内', '미국행 수하물 안내', 'US-bound bags'), V.from + ' → ' + p.conn.from + ' → ' + p.conn.to + ' · ' + tx(L('最終目的地までタグ', '최종 목적지까지 태그', 'Tagged through')),
      L('この乗り継ぎ（' + p.conn.from + '経由' + p.conn.to + '）では、米国で最初に到着する空港（' + p.conn.to + '）で手荷物を受け取り、税関の検査を受けます。食品・肉類・果物などの申告はお客様ご自身の責任です。受託手荷物は米国運輸保安庁（TSA）が開けて検査することがあるため、施錠しないかTSA認証の鍵を使っていただきます（認証のない鍵は壊して開けられることがあります）。※米国の事前入国審査を受ける空港や一部の乗り継ぎ手続きでは流れが異なるため、路線ごとに確認します（Vela Air 教育用）。', '이 연결(' + p.conn.from + ' 경유 ' + p.conn.to + ')에서는 미국에서 처음 도착하는 공항(' + p.conn.to + ')에서 짐을 찾아 세관 검사를 받습니다. 식품·육류·과일 등의 신고는 승객 본인 책임입니다. 위탁 수하물은 미국 교통보안청(TSA)이 열어 검사할 수 있어 잠그지 않거나 TSA 인증 잠금장치를 쓰도록 안내합니다(인증이 없는 잠금장치는 부수고 열 수 있음). ※미국 사전 입국심사를 받는 공항이나 일부 환승 절차에서는 흐름이 달라 노선마다 확인합니다(Vela Air 교육용).', 'On this connection (via ' + p.conn.from + ' to ' + p.conn.to + '), the bags are collected at the first US airport (' + p.conn.to + ') for customs. Declaring food, meat, fruit and so on is the passenger\'s own responsibility. US TSA may open checked bags, so they should be left unlocked or use a TSA-approved lock (other locks may be cut open). *The flow differs at airports with US preclearance and for some transfer programmes, so check it per route (Vela Air, training).'),
      shufOpts([{ t: L('最初に着く米国の空港（' + p.conn.to + '）で荷物を受け取って税関へ、食品などの申告はお客様の責任、TSAが開けて検査することがあるので鍵はかけないかTSAロック、と案内する', '처음 도착하는 미국 공항(' + p.conn.to + ')에서 짐을 찾아 세관으로, 식품 등 신고는 승객 책임, TSA가 열어 검사할 수 있으니 잠그지 않거나 TSA 잠금장치라고 안내한다', 'Explain: collect the bags at the first US airport (' + p.conn.to + ') for customs, declaring food is the passenger\'s responsibility, TSA may open bags so leave them unlocked or use a TSA lock'), good: 1,
         run: function () { c.flags.usNote = 'ok'; addTime(1); say('me', D.usNotice); var me = c; setTimeout(function () { if (S.cur === me) say('pax', p.say.usOk || D.usPaxOk); }, 2400); note('good', function () { return tx(L('米国行きの手荷物について、最初の到着空港での受け取り・税関（申告はお客様の責任）とTSAの検査・鍵をご案内しました。', '미국행 수하물에 대해 첫 도착 공항에서 찾기·세관(신고는 승객 책임)과 TSA 검사·잠금을 안내했습니다.', 'You explained collecting bags at the first US airport for customs (declaring is the passenger\'s responsibility) and TSA inspection and locks.')); }, 'passenger/1-10'); } },
       { t: L('税関の検査は乗り継ぎ地（' + p.conn.from + '）で受けると案内する', '세관 검사는 환승지(' + p.conn.from + ')에서 받는다고 안내한다', 'Tell them customs is done at the transit point (' + p.conn.from + ')'),
         code: 'us-transit', run: function () { c.flags.usNote = 'wrong'; addTime(.5); note('bad', function () { return tx(L('税関の検査を乗り継ぎ地で受けると誤って案内しました。米国では最初に到着する空港で荷物を受け取り、税関の検査を受けます。', '세관 검사를 환승지에서 받는다고 잘못 안내했습니다. 미국은 처음 도착하는 공항에서 짐을 찾아 세관 검사를 받습니다.', 'You wrongly said customs is at the transit point. In the US, bags are collected and cleared at the first US airport.')); }, 'passenger/1-10', 'us-notice'); } },
       { t: L('大切な荷物なので、どんな鍵でもしっかりかけておけば検査も心配ないと案内する', '소중한 짐이니 어떤 잠금장치든 단단히 잠가 두면 검사 걱정도 없다고 안내한다', 'Tell them any lock is fine — lock the bags tightly and inspection is nothing to worry about'),
         code: 'us-lock', run: function () { c.flags.usNote = 'wrong'; addTime(.5); note('bad', function () { return tx(L('どんな鍵でもかけておけばよいと案内し、TSAの検査のことを伝えませんでした。米国行きの受託手荷物はTSAが開けて検査することがあり、TSA認証でない鍵は壊して開けられることがあります。施錠しないか、TSA認証の鍵を案内します。', '어떤 잠금장치든 잠그면 된다고 안내하고 TSA 검사에 대해 전하지 않았습니다. 미국행 위탁 수하물은 TSA가 열어 검사할 수 있어, TSA 인증이 아닌 잠금장치는 부수고 열 수 있습니다. 잠그지 않거나 TSA 인증 잠금장치를 안내합니다.', 'You said any lock is fine and left out the TSA inspection. TSA may open US-bound checked bags and can cut locks that are not TSA-approved. Advise leaving them unlocked or using a TSA-approved lock.')); }, 'passenger/1-10', 'us-notice'); } }], 'us-notice'),
      'passenger/1-10', function () { tabBag(); renderTabs(); });
  }
  function weigh(i) {
    var c = S.cur, p = c.p, kg = p.bags[i].kg; addTime(M.cost.weigh);
    STG.bag(p.bags[i].stroller ? (p.bags[i].prop || 'stroller') : (p.bags[i].prop || 'case'));
    var t0 = performance.now(); (function anim(t) { var el = $('#scalelcd'); if (!el) return; var k = Math.min(1, (t - t0) / 500); el.textContent = (kg * k).toFixed(1); if (k < 1) requestAnimationFrame(anim); })(t0);
    c.bags[i].w = kg; sfx.tap();
    if (p.bags[i].mob) { tabBag(); renderTabs(); return decideMob(i); }
    if (!p.bags[i].stroller && kg > R.airline.VELA.pieceMaxKg) { tabBag(); renderTabs(); return decideHeavy(i); }
    if (p.bags[i].golf && !c.bags[i].ex) { tabBag(); renderTabs(); return decideGolf(i); }
    if (!p.bags[i].stroller && kg > R.airline.VELA.freeBag.Y.kg) { tabBag(); renderTabs(); return decideOverweight(i); }
    tabBag(); renderTabs();
  }
  /* 1個の上限(32kg, Vela Air 교육용)을 넘는 짐: 그대로는 받지 않음 → 2개로 나눔(2개째는 초과 요금) */
  function decideHeavy(i) {
    var c = S.cur, p = c.p, ap = R.airline.VELA, kg = c.bags[i].w, n = Math.ceil(kg / ap.pieceMaxKg), fee = ap.excessWeight[G.country];
    var opts = [];
    if (n <= 3) opts.push({ id: 'split', t: L('荷物を' + n + '個に分けてもらう（増えた' + (n - 1) + '個は追加料金・1個' + ap.pieceMaxKg + 'kg以下）', '짐을 ' + n + '개로 나누게 한다(늘어난 ' + (n - 1) + '개는 추가 요금·1개 ' + ap.pieceMaxKg + 'kg 이하)', 'Have it split into ' + n + ' pieces (' + (n - 1) + ' extra charged; each up to ' + ap.pieceMaxKg + 'kg)'), s: L('約5分', '약 5분', '~5 min'),
      run: function () {
        addTime(5); mood(-8);
        var each = Math.floor(kg / n * 10) / 10, rest = Math.round((kg - each * (n - 1)) * 10) / 10;
        p.bags[i].kg = rest; c.bags[i].w = rest;
        for (var k = 1; k < n; k++) { p.bags.push({ kg: each, extra: true }); c.bags.push({ w: null, tag: null }); S.revenue.push({ pax: p.pp.sur, amt: fee.amt, cur: fee.cur, what: 'EXTRA PIECE' }); }
        note('good', function () { return tx(L('1個の上限を超える荷物を分けてもらい、増えた分の料金を案内しました。', '1개 상한을 넘는 짐을 나누게 하고 늘어난 개수의 요금을 안내했습니다.', 'You had the over-limit bag split and charged the extra pieces.')); }, 'passenger/1-10');
      } });
    else opts.push({ id: 'cargo', t: L('手荷物としては運べないことを説明し、貨物での発送を案内する', '수하물로는 운송할 수 없음을 설명하고 화물 발송을 안내한다', 'Explain it cannot travel as baggage and suggest sending it as cargo'), s: L('約4分', '약 4분', '~4 min'),
      run: function () { addTime(4); mood(-12); p.bags.splice(i, 1); c.bags.splice(i, 1); STG.bag(null); note('good', function () { return tx(L('手荷物の範囲を超える重さのため、貨物での発送を案内しました。', '수하물 범위를 넘는 무게라서 화물 발송을 안내했습니다.', 'Too heavy for baggage, so you suggested cargo.')); }, 'passenger/1-10'); } });
    opts.push({ id: 'take', t: L('料金を取ってそのまま預かる', '요금을 받고 그대로 맡는다', 'Charge a fee and accept it as is'), lock: L('できません：1個の上限を超える荷物は、料金を払ってもそのまま預からない（作業者の安全）', '할 수 없음: 1개 상한을 넘는 짐은 요금을 내도 그대로 받지 않음(작업자 안전)', 'Not allowed: an over-limit piece is never accepted as is, even for a fee (handler safety)') });
    modal(L('1個の上限を超えています', '1개 상한을 넘었습니다', 'Over the per-piece limit'), kg.toFixed(1) + ' kg > ' + ap.pieceMaxKg + ' kg',
      L('1個の重さには上限があります（Vela Air 教育用：32kg）。作業する人の安全のため、上限を超える荷物は料金を払ってもそのままではお預かりしません。分けても上限を超える分は手荷物として運べません。', '1개의 무게에는 상한이 있습니다(Vela Air 교육용: 32kg). 작업자 안전을 위해 상한을 넘는 짐은 요금을 내도 그대로는 받지 않습니다. 나눠도 상한을 넘으면 수하물로 운송할 수 없습니다.', 'Each piece has a weight limit (Vela Air, training: 32kg). For handlers\' safety, a heavier piece is not accepted as is, even for a fee.'),
      opts, 'passenger/1-10', function () { tabBag(); renderTabs(); });
  }
  function tagBag(i, dst) {
    var c = S.cur, p = c.p;
    if (p.bags[i].golf && !c.bags[i].ex) return decideGolf(i);
    if (p.bags[i].mob && !c.bags[i].mobOk) return decideMob(i);
    if (!p.bags[i].stroller && c.bags[i].w > R.airline.VELA.pieceMaxKg) { return decideHeavy(i); } /* 태그 직전 공통 상한 검사: 요금·추가 짐으로 우회 불가 */
    if (!p.bags[i].stroller && c.bags[i].w > R.airline.VELA.freeBag.Y.kg && !c.bags[i].ex) { return decideOverweight(i); }
    addTime(M.cost.tag); sfx.print();
    c.bags[i].tag = S.manual ? 'MAN' + (S.manTag = (S.manTag || 700) + 1) : 'VL' + (100000 + Math.floor(Math.random() * 899999)); if (S.manual) c.bags[i].manual = true;
    if (dst) { c.bags[i].dest = dst; if (p.conn && dst !== p.conn.to && !c.flags.shortTag) { c.flags.shortTag = true; note('bad', function () { return tx(L('乗り継ぎ地までのタグにしました。同じ航空券・連帯運送の契約で乗り継ぎが可能な場合は最終目的地までタグを付けます（乗り継ぎ地で受け取り直しが必要になり、乗り遅れや紛失の原因）。', '환승지까지 태그를 달았습니다. 같은 항공권·연대운송 계약으로 연결이 가능하면 최종 목적지까지 태그합니다(환승지에서 다시 찾아야 해서 연결 실패·분실 원인).', 'You tagged only to the transit point. With one ticket and a through-check agreement, tag to the final destination (otherwise the bag must be re-checked, risking misconnection or loss).')); }, 'passenger/1-10', 'tag-short'); } }
    if (!c.dg && p.bags.length) c.flags.tagNoDG = true;
    if (p.dg === 'pb' && !c.dg) c.flags.pbInHold = true;
    tabBag(); renderTabs();
  }
  function askDG() {
    var c = S.cur, p = c.p; c.dg = true; addTime(M.cost.dg);
    say('me', D.dg);

    var alive = function () { return G.screen === 'play' && S.cur === c; };
    setTimeout(function () { if (alive()) say('pax', p.say.dg); }, 500);
    if (p.dg === 'pb') { if (c.bags.some(function (b) { return b.tag; })) c.flags.pbTaggedFirst = true; setTimeout(function () { if (alive()) decideBattery(); }, 900); }
    else { note('good', function () { return tx(L('預ける荷物の保安質問をしました。', '위탁 수하물 보안 질문을 했습니다.', 'You asked the security questions for the checked bag.')); }, 'passenger/1-1'); tabBag(); renderTabs(); }
  }
  function decideOverweight(i) {
    var c = S.cur, p = c.p, ap = R.airline.VELA, kg = c.bags[i].w, over = Math.round((kg - ap.freeBag.Y.kg) * 10) / 10, fee = ap.excessWeight[G.country];
    var feeTxt = (fee.cur === 'JPY' ? '¥' : '₩') + fee.amt.toLocaleString();
    var canMove = p.carry + over <= ap.cabinMaxKg; say('me', D.over);
    modal(L('重さの超過', '무게 초과', 'Overweight bag'), kg.toFixed(1) + ' kg − 23.0 kg = ' + over.toFixed(1) + ' kg',
      L('許容量と超過分を具体的に示し、「支払う」「荷物を減らす（機内に移す）」などの選択肢をお客様に選んでもらいます。機内に移せるのは、持ち込みの重さ・大きさ・個数と品目の制限に収まる物だけです。', '허용량과 초과분을 구체적으로 보여 주고 「요금 지불」「짐 줄이기(기내로 옮기기)」 같은 선택지를 승객이 고르게 합니다. 기내로 옮길 수 있는 것은 반입 무게·크기·개수와 품목 제한에 맞는 물건뿐입니다.', 'Show the allowance and the excess clearly, and let the passenger choose: pay, or lighten the bag (move items to the carry-on). Only items within the cabin weight, size, number and item limits can be moved.'),
      [{ id: 'pay', t: L('超過料金を案内する', '초과 요금을 안내한다', 'Explain the excess fee'), s: feeTxt + tx(L('（教育用）／ 約3分', '(교육용) / 약 3분', ' (training) / ~3 min')),
        run: function () { addTime(3); mood(-6); c.flags.excessDone = true; c.bags[i].ex = true; S.revenue.push({ pax: p.pp.sur, amt: fee.amt, cur: fee.cur, what: 'EXCESS BAG' }); say('pax', p.say.pay); note('good', function () { return tx(L('超過分を示して料金を案内し、収納しました。', '초과분을 보여 주고 요금을 안내해 받았습니다.', 'You showed the excess, explained the fee and collected it.')); }, 'passenger/1-10'); } },
       { id: 'move', t: L('機内持ち込みの制限（重さ・大きさ・個数・品目）の範囲で、一部を手荷物に移してもらう', '기내 반입 제한(무게·크기·개수·품목) 범위에서 일부를 기내 가방으로 옮기게 한다', 'Move some items to the carry-on, within the cabin limits (weight, size, number, items)'), s: tx(L('機内持ち込み ', '기내 반입 ', 'Carry-on ')) + p.carry.toFixed(1) + ' + ' + over.toFixed(1) + ' = ' + (p.carry + over).toFixed(1) + ' kg（' + tx(L('上限', '상한', 'max')) + ' 10 kg）',
        lock: canMove ? null : L('できません：機内持ち込みの上限を超える', '할 수 없음: 기내 반입 상한 초과', 'Not possible: carry-on would exceed the limit'),
        run: function () { addTime(4); mood(-1); c.flags.excessDone = true; c.bags[i].ex = true; c.bags[i].w = ap.freeBag.Y.kg; p.carry = Math.round((p.carry + over) * 10) / 10; $('#scalelcd').textContent = c.bags[i].w.toFixed(1); say('pax', p.say.move); note('good', function () { return tx(L('機内持ち込みの上限内で荷物を移してもらい、許容量に収めました。', '기내 반입 상한 안에서 짐을 옮기게 해 허용량에 맞췄습니다.', 'You had the passenger move items within the carry-on limit to fit the allowance.')); }, 'passenger/1-10'); } },
       { id: 'waive', t: L('今回は無料にしておく', '이번에는 무료로 해 준다', 'Let it go free this time'), lock: L('できません：担当者の判断で規定外の免除はしない（公平性・収入）', '할 수 없음: 담당자 판단으로 규정 밖 면제를 하지 않음(공평성·수입)', 'Not allowed: agents do not waive fees outside the rules (fairness, revenue)') }],
      'passenger/1-10', function () { tabBag(); renderTabs(); });
  }
  function decideBattery() {
    var c = S.cur, p = c.p, cr = R.country[G.country], core = R.core; say('me', D.pbOut);
    var rows = p.pb.map(function (b, i) { return { i: i, mAh: b.mAh, v: b.v, wh: core.wh(b.mAh, b.v), ans: null }; });
    function body() {
      return '<p>' + esc(tx(L('モバイルバッテリーは受託手荷物に入れられません。まず取り出してもらい、1個ずつ容量（Wh）を確認します。', '보조배터리는 위탁 수하물에 넣을 수 없습니다. 먼저 꺼내게 하고 하나씩 용량(Wh)을 확인합니다.', 'Power banks cannot go in checked bags. Have them taken out first, then check the capacity (Wh) of each one.'))) + '</p>' +
        '<p class="mono" style="font-size:13px">Wh = mAh × V ÷ 1000</p>' +
        rows.map(function (r) {
          return '<div class="opt" style="cursor:default"><b class="mono">#' + (r.i + 1) + ' ' + r.mAh.toLocaleString() + ' mAh · ' + r.v + ' V</b>' +
            (r.ans ? '<small>' + r.wh + ' Wh → ' + esc(tx(cat(r.wh))) + (r.ans === catKey(r.wh) ? ' ✓' : ' ✗') + '</small>' :
              '<div class="btns" style="margin-top:6px">' + ['le100', 'le160', 'gt160'].map(function (k) { return '<button class="btn ghost pbb" data-b="' + r.i + '" data-c="' + k + '">' + esc(tx(catLab(k))) + '</button>'; }).join('') + '</div>') + '</div>';
        }).join('');
    }
    function catKey(wh) { return wh <= 100 ? 'le100' : wh <= 160 ? 'le160' : 'gt160'; }
    function catLab(k) { return { le100: L('100Wh以下', '100Wh 이하', '≤100Wh'), le160: L('100Wh超〜160Wh以下', '100Wh 초과~160Wh 이하', '>100Wh to 160Wh'), gt160: L('160Wh超', '160Wh 초과', '>160Wh') }[k]; }
    function cat(wh) { return catLab(catKey(wh)); }
    var card;
    function render() {
      card = openModalShell(L('モバイルバッテリーが3個、スーツケースに入っています', '보조배터리 3개가 캐리어에 들어 있습니다', 'Three power banks in the suitcase'), body());
      S.modalRedraw = render;
      card.addEventListener('click', onPick);
    }
    render();
    function onPick(e) {
      var b = e.target.closest('[data-b]'); if (!b) return;
      var r = rows[+b.dataset.b]; r.ans = b.dataset.c; addTime(.5);
      if (r.ans === catKey(r.wh)) sfx.ok(); else { sfx.ng(); note('bad', function () { return tx(L('容量の区分を間違えました：', '용량 구분을 틀렸습니다: ', 'Wrong capacity band: ')) + r.mAh + 'mAh = ' + r.wh + 'Wh'; }, 'passenger/1-13'); }
      card.querySelector('.cbody').innerHTML = body();
      if (rows.every(function (x) { return x.ans; })) setTimeout(function () { if (G.screen === 'play' && S.cur === c) step2(); }, 500);
    }
    function step2() {
      closeModal();
      var cr0 = R.country[G.country].pb;
      modal(L('どれを機内に持ち込めますか', '어느 것을 기내에 들고 갈 수 있나요', 'Which can go in the cabin?'), '37Wh · 74Wh · 111Wh',
        L('国の基準：160Wh以下・1人' + cr0.maxCarry + '個まで（100Wh超は航空会社の承認が必要）、受託不可。Vela Air（教育用）：100Whを超えるものはカウンターで承認しません。', '국가 기준: 160Wh 이하·1인 ' + cr0.maxCarry + '개까지(100Wh 초과는 항공사 승인 필요), 위탁 불가. Vela Air(교육용): 100Wh를 넘는 것은 카운터에서 승인하지 않습니다.', 'National rule: up to 160Wh, max ' + cr0.maxCarry + ' per person (over 100Wh needs airline approval), never in checked bags. Vela Air (training): nothing over 100Wh is approved at the counter.'),
        [{ id: 'ship', t: L('37Wh・74Whは手荷物へ。111Whは空港の宅配カウンターで送れるか確認してもらう（送れなければ放棄の手順へ）', '37Wh·74Wh는 기내로. 111Wh는 공항 택배 창구에서 보낼 수 있는지 확인하게 한다(안 되면 포기 절차로)', '37Wh and 74Wh in the cabin bag; the 111Wh one: check at the airport delivery counter whether it can be shipped (if not, surrender procedure)'), s: L('リチウム電池は宅配でも送れない場合がある ― 可否は窓口が判断 ／ 約5分', '리튬 배터리는 택배로도 못 보낼 수 있음 — 가능 여부는 창구가 판단 / 약 5분', 'Lithium batteries may not be accepted for shipping either; the counter decides / ~5 min'),
          run: function () { addTime(5); mood(-6); done('ship'); } },
         { id: 'discard', t: L('37Wh・74Whは手荷物へ。111Whは空港の所定の手順で放棄していただく', '37Wh·74Wh는 기내로. 111Wh는 공항의 정해진 절차로 포기하게 한다', '37Wh and 74Wh in the cabin; the 111Wh one is surrendered under the airport procedure'), s: L('選択肢と取扱いを説明し、記録 ／ 約2分', '선택지와 처리를 설명하고 기록 / 약 2분', 'Explain the options and handling, and record it / ~2 min'),
          run: function () { addTime(2); mood(-14); done('discard'); } },
         { id: 'all', t: L('3個とも機内に持ち込ませる', '3개 모두 기내에 들고 가게 한다', 'Let all three go in the cabin'), lock: L('できません：国の基準で1人' + cr0.maxCarry + '個まで ／ Vela Air（教育用）は100Wh超を承認しない', '할 수 없음: 국가 기준 1인 ' + cr0.maxCarry + '개까지 / Vela Air(교육용)는 100Wh 초과를 승인하지 않음', 'Not allowed: national rule max ' + cr0.maxCarry + ' per person / Vela Air (training) does not approve over 100Wh') },
         { id: 'hold', t: L('預けたままにする', '맡긴 채로 둔다', 'Leave them in the checked bag'), lock: L('できません：モバイルバッテリーは受託手荷物に入れない', '할 수 없음: 보조배터리는 위탁 수하물에 넣지 않음', 'Not allowed: power banks never go in checked baggage') }],
        'passenger/1-13', function () { tabBag(); renderTabs(); });
    }
    function done(how) {
      say('pax', how === 'discard' ? p.say.pbDiscard : p.say.pbShip);
      note('good', function () { return tx(L('保安質問でモバイルバッテリーを見つけ、受託から取り出して容量と個数を確認しました。', '보안 질문으로 보조배터리를 찾아 위탁에서 꺼내고 용량과 개수를 확인했습니다.', 'Your security questions found the power banks; you took them out of the checked bag and checked capacity and count.')); }, 'passenger/1-13');
      note('info', function () { return tx(cr.pb.note); }, 'passenger/1-13');
      if (c.flags.pbTaggedFirst) { addTime(4); note('bad', function () { return tx(L('タグを付けて荷物をベルトに流した後で質問したため、荷物をBHS（手荷物搬送システム）から戻す手間がかかりました。質問はタグを付ける前に。', '태그를 달아 짐을 벨트로 보낸 뒤에 질문해서, 짐을 BHS(수하물 처리 시스템)에서 되찾아 오는 수고가 들었습니다. 질문은 태그를 달기 전에.', 'You tagged the bag and sent it down the belt before asking, so it had to be pulled back from the BHS (baggage handling system). Ask before tagging.')); }, 'passenger/1-1'); }
      c.flags.pbHandled = true;
    }
  }

  /* 탑승권 */
  function tabBP() {
    var c = S.cur, p = c.p;
    var need = [];
    if (!c.pnr) need.push(L('予約の呼び出し', '예약 불러오기', 'Retrieve the booking'));
    if (!c.pp) need.push(L('旅券の受け取り', '여권 받기', 'Take the passport'));
    if (!c.seat || (p.party && (c.famSeats || []).length < 3)) need.push(L('座席', '좌석', 'Seat'));
    if (c.bags.some(function (b) { return !b.tag; })) need.push(L('手荷物タグ', '수하물 태그', 'Bag tags'));
    if (c.bp) {
      if (S.leaving && S.leaveGo) { scr(bpHTML() + '<div class="btns"><button class="btn pri nextpax" id="nextpax">' + esc(tx(L('次のお客様へ ▶', '다음 승객 ▶', 'Next passenger ▶'))) + '</button></div>'); bindNextPax(); return; }
      scr(bpHTML() + '<div class="btns"><button class="btn pri" id="bye">' + esc(tx(L('ゲートと時刻を案内してお見送り', '게이트와 시각을 안내하고 배웅', 'Give gate and time, and see them off'))) + '</button></div>');
      $('#bye').onclick = function () { endPax(false); };
      return;
    }
    var html = '<div class="h3">' + esc(tx(L('搭乗券を発行する', '탑승권 발행', 'Issue the boarding pass'))) + '</div><img class="bpprop" src="' + STG.src('prop_boarding_pass_01') + '" alt="">';
    if (need.length) html += '<p class="small">' + esc(tx(L('まだ終わっていない手続き：', '아직 끝나지 않은 수속: ', 'Still to do: '))) + need.map(tx).join('、') + '</p>';
    var warn = [];
    if (!c.chk.validity || !c.chk.photo || !c.chk.ticketName) warn.push(L('旅券の確認', '여권 확인', 'passport checks'));
    if (!c.denied && (!c.entryQ || !c.chk.entry)) warn.push(L('渡航条件', '입국 조건', 'entry requirements'));
    if (p.bags.length && !c.dg) warn.push(L('保安質問', '보안 질문', 'security questions'));
    if (G.hints && warn.length && !need.length) html += '<p class="small" style="color:var(--termwarn)">' + esc(tx(L('未確認：', '미확인: ', 'Not checked: '))) + warn.map(tx).join('、') + esc(tx(L(' ― 発行はできますが、安全・保安の見落としとして記録されます。', ' — 발행은 되지만 안전·보안 누락으로 기록됩니다.', ' — you can still issue, but it will be recorded as a safety miss.'))) + '</p>';
    html += '<div class="btns"><button class="btn pri" id="issue" ' + (need.length ? 'disabled' : '') + '>' + esc(tx(L('発行する', '발행', 'Issue'))) + '</button></div>';
    scr(html);
    if ($('#issue')) $('#issue').onclick = issueBP;
  }
  function issueBP() {
    var c = S.cur; if (!c || c.bp) return;   /* 24차b(GPT 24-F03): 같은 승객 발권을 두 번 실행하지 않음 */
    var p = c.p;
    if (S.manual && !c.seqPicked) return pickSeq();
    Object.keys(c.fixTry || {}).forEach(function (code) {
      act(c, code, 'issued-unresolved'); delete c.fixTry[code];
      if (code === 'pp-expired' && has(p, 'expired')) c.flags.missed_validity = true;
      if (code === 'id-mismatch' && p.idMatch === false) c.flags.idWrong = true;
      if (code === 'esta-check' && !c.flags.estaChecked) c.flags.estaSkip = true;
      if (code === 'conn-miss' && !c.flags.connRebooked) c.flags.missed_conn = true;
    });
    if (S.delay && p.conn && !c.flags.connNoted) { c.flags.connNoted = true;
      var cmiss = !c.flags.connRebooked && (c.flags.missed_conn || c.flags.connKeep || (!c.chk.conn && truth('conn') === 'ng'));
      evCheck('conn-' + p.id, !cmiss && !c.flags.connOver && !!c.chk.conn);
      if (cmiss) { act(c, 'conn-miss', 'issued-through-on-missed-connection'); note('bad', function () { return tx(L('遅延後は乗り継ぎ時間がMCTに足りず、元の乗り継ぎ便には間に合いません。そのまま通しで発券・タグ付けしたため、お客様と荷物が乗り継ぎ地で行き場を失います。', '지연 후에는 연결 시간이 MCT에 모자라 원래 연결편에 탈 수 없습니다. 그대로 통으로 발권·태그해서 승객과 짐이 환승지에서 갈 곳을 잃습니다.', 'After the delay the connection fell short of the MCT. Issuing and tagging through on the original flight leaves the passenger and bags stranded at the transfer point.')); }, 'passenger/1-4', 'conn-miss'); }
      else if (!c.chk.conn) note('bad', function () { return tx(L('遅延後の到着予定で乗り継ぎ時間を確かめずに発券しました（今回は間に合う時間でした）。遅延のときは、乗り継ぎのあるお客様の接続を必ず計算し直します。', '지연 후 도착 예정으로 연결 시간을 확인하지 않고 발권했습니다(이번에는 맞출 수 있는 시간이었음). 지연 때는 연결편 승객의 연결을 반드시 다시 계산합니다.', 'You issued without rechecking the connection against the delayed arrival (it was fine this time). In a delay, always recalculate connections.')); }, 'passenger/1-4', 'conn-recheck');
    }
    /* 놓친 확인의 결과 */
    if (has(p, 'name') && !c.flags.nameFixed) {
      sfx.ng(); addTime(5); mood(-10); var was = p.pnr.sur + '/' + p.pnr.given; fixName(c); c.chk.ticketName = 'ok'; c.flags.nameSkipped = true;
      note('bad', function () { return tx(L('予約と旅券の名前の違いを見落とし、API送信でエラーになりました。訂正のため5分かかりました。', '예약과 여권의 이름 차이를 놓쳐 API 송신에서 오류가 났습니다. 정정에 5분이 걸렸습니다.', 'You missed the name mismatch and the API transmission failed. Fixing it took 5 minutes.')); }, 'ciq/0-4');
      return modal(L('API送信エラー', 'API 송신 오류', 'API transmission error'), 'NAME MISMATCH ' + p.pp.sur + '/' + p.pp.given + ' ≠ ' + was,
        L('事前旅客情報（API）は旅券の情報で送ります。予約の名前を規定にそって訂正しました。', '사전 승객 정보(API)는 여권 정보로 보냅니다. 예약 이름을 규정에 따라 정정했습니다.', 'API data is sent from the passport. The booking name has been corrected under the rules.'),
        [{ id: 'ok', t: L('訂正して続ける', '정정하고 계속', 'Correct it and continue'), run: function () {} }], 'ciq/0-4', function () { issueBP(); });
    }
    if (has(p, 'visa') && !c.flags.denied) { safetyMiss(c, L('期限切れの査証で搭乗券を発行（入国拒否）', '만료된 비자로 탑승권 발행(입국 거부)', 'Boarding pass issued on an expired visa (refused entry)'), 'visa-inad'); c.flags.inad = true; note('bad', function () { return tx(L('期限切れの査証を見落として搭乗券を出しました。到着地で入国拒否（INAD）となり、送還費用と違反通知の対象になります。', '기한이 지난 비자를 놓치고 탑승권을 발행했습니다. 도착지에서 입국 거부(INAD)되어 송환 비용과 위반 통지 대상이 됩니다.', 'You missed the expired visa and issued a boarding pass. The passenger will be refused entry (INAD): removal costs and an infringement notice.')); }, 'ciq/1-4', 'visa-inad'); }
    if (c.flags.pbCarry) { safetyMiss(c, L('機内用バッグを中を確認せずに預けに変え、モバイルバッテリーが受託手荷物に残った', '기내 가방을 안을 확인하지 않고 위탁으로 바꿔 보조배터리가 위탁 수하물에 남음', 'Switched the carry-on to checked without looking inside; a power bank stayed in the checked bag'), 'pb-carry'); addTime(6); mood(-15); note('bad', function () { return tx(L('機内用バッグを預けに変える前に、モバイルバッテリー・予備電池を取り出していませんでした。X線検査で見つかり、開披検査になりました。', '기내 가방을 위탁으로 바꾸기 전에 보조배터리·예비 배터리를 꺼내지 않았습니다. X선 검사에서 발견되어 개방 검사가 되었습니다.', 'You did not take out the power bank and spare batteries before checking the carry-on. X-ray found them and the bag was searched.')); }, 'passenger/1-13', 'pb-carry'); }
    if (c.flags.pbInHold && !c.flags.pbHandled) { safetyMiss(c, L('保安質問をせずにタグを付け、受託手荷物にモバイルバッテリーが残ったまま（X線で発見・開披検査）', '보안 질문 없이 태그를 달아 위탁 수하물에 보조배터리가 남음(X선 발견·개방 검사)', 'Tagged without the security questions; power banks stayed in the checked bag (found by X-ray, bag search)'), 'pb-hold'); addTime(6); mood(-15); note('bad', function () { return tx(L('保安質問をせずにタグを付けたため、X線検査で受託手荷物の中のモバイルバッテリーが見つかり、開披検査になりました。', '보안 질문 없이 태그를 달아서 X선 검사에서 위탁 수하물 속 보조배터리가 발견되어 개방 검사가 되었습니다.', 'You tagged the bag without the security questions. X-ray found power banks in the checked bag and a bag search followed.')); }, 'passenger/2-3', 'pb-hold'); }
    else if (c.flags.tagNoDG && !c.dg) { safetyMiss(c, L('預ける荷物の保安質問をしていない', '위탁 수하물 보안 질문을 하지 않음', 'No security questions for the checked bag'), 'dg-skip'); note('bad', function () { return tx(L('預ける荷物の保安質問をしませんでした。今回は該当物がありませんでしたが、保安上の必須手順の省略です。', '위탁 수하물 보안 질문을 하지 않았습니다. 이번에는 해당 물품이 없었지만 보안상 필수 절차를 생략한 것입니다.', 'You skipped the security questions for the checked bag. Nothing was found this time, but it is a mandatory security step.')); }, 'passenger/1-1', 'dg-skip'); }
    /* 24차b(GPT 24-F02): 서명 판정은 발권 때 최종 상태로. 서명은 그 승객에게 한 번 받으면 이 편에서 유효(안내문은 비상구 좌석 공통) */
    if (c.flags.exitNoSign && !c.flags.exitSigned && c.seat && ACFT().exitRows.indexOf(parseInt(c.seat, 10)) >= 0) {
      act(c, 'exit-nosign', 'issued-unresolved'); note('bad', function () { return tx(L('非常口座席を口頭の同意だけで割り当て、案内文への署名をいただきませんでした（Vela Air 教育用の規定では署名が必要）。', '비상구 좌석을 구두 동의만으로 배정하고 안내문 서명을 받지 않았습니다(Vela Air 교육용 규정상 서명 필요).', 'You assigned the exit row on spoken consent only, without the signed card (the Vela Air training rule needs a signature).')); }, 'passenger/1-5', 'exit-nosign');
    } else if (c.flags.exitNoSign) {
      selfFix(c, 'exit-nosign'); act(c, 'exit-nosign', c.flags.exitSigned ? 'corrected-signed' : 'corrected-moved'); note('info', function () { return tx(c.flags.exitSigned ? L('口頭の同意だけで割り当てたあと、発券前に案内文への署名をいただきました。', '구두 동의만으로 배정한 뒤, 발권 전에 안내문 서명을 받았습니다.', 'After assigning on spoken consent only, you got the signed card before issuing.') : L('口頭の同意だけで非常口座席にしたあと、発券前に別の席に変えました。', '구두 동의만으로 비상구 좌석에 배정한 뒤, 발권 전에 다른 좌석으로 바꿨습니다.', 'After an oral-only exit row assignment, you moved the passenger before issuing.')); }, 'passenger/1-5');
    }
    if (exitReqBanned(p) && !c.flags.exitExplained) { mood(-6); note('bad', function () { return tx(L('非常口座席のご希望に、座れない理由を説明しないまま別の席にしました。お客様の希望には、できない理由と代わりの案を必ず伝えます。', '비상구 좌석 희망에 앉을 수 없는 이유를 설명하지 않고 다른 자리로 배정했습니다. 승객의 희망에는 안 되는 이유와 대안을 꼭 전합니다.', 'You moved them to another seat without explaining why the exit row was not possible. Always give the reason and an alternative.')); }, 'passenger/1-5', 'exit-noexplain'); }
    if (p.inf && !c.chk.infpp && c.chk.validity && c.chk.photo && c.chk.ticketName) { safetyMiss(c, L('幼児の旅券を確認せずに発券', '유아 여권을 확인하지 않고 발권', 'Issued without checking the infant passport'), 'inf-pp-check'); note('bad', function () { return tx(L('幼児も自分の旅券が必要です。有効期限・名前（予約のINFT）・2歳未満であることを確認せずに発券しました。', '유아도 자기 여권이 필요합니다. 유효기간·이름(예약의 INFT)·만 2세 미만인지 확인하지 않고 발권했습니다.', 'Infants need their own passport. You issued without checking its validity, the name (INFT in the booking) and that the child is under 2.')); }, 'passenger/1-3', 'inf-pp-check'); }
    if (!c.chk.validity || !c.chk.photo || !c.chk.ticketName || c.flags.nameSkipped) { safetyMiss(c, L('旅券の確認（有効期限・写真と本人・予約の名前）をしていない', '여권 확인(유효기간·사진과 본인·예약 이름)을 하지 않음', 'Passport not fully checked (validity, photo, name on the booking)'), 'pp-check'); note('bad', function () { return tx(L('旅券の確認（有効期限・写真と本人・予約の名前）を終えずに発券しました。本人確認と書類確認は必須です。', '여권 확인(유효기간·사진과 본인·예약 이름)을 끝내지 않고 발권했습니다. 본인 확인과 서류 확인은 필수입니다.', 'You issued without finishing the passport checks (validity, photo, name on the booking). Identity and document checks are mandatory.')); }, 'passenger/1-3', 'pp-check'); }
    if (!has(p, 'visa') && (!c.entryQ || !c.chk.entry)) { safetyMiss(c, L('渡航条件（入国・通過）を確認していない', '입국·경유 조건을 확인하지 않음', 'Entry/transit requirements not checked'), 'entry-check'); note('bad', function () { return tx(L('渡航条件を確認せずに発券しました（今回は問題なし）。書類不備のまま運ぶと入国拒否の原因になります。', '입국 조건을 확인하지 않고 발권했습니다(이번에는 문제없음). 서류 미비로 운송하면 입국 거부의 원인이 됩니다.', 'You issued without checking the entry requirements (fine this time). Carrying a passenger with the wrong documents leads to refused entry.')); }, 'ciq/1-2', 'entry-check'); }
    if (c.flags.missed_validity) { safetyMiss(c, L('有効期限の切れた旅券で発券', '유효기간이 지난 여권으로 발권', 'Issued on an expired passport'), 'pp-expired'); note('bad', function () { return tx(L('旅券の有効期限が切れていることを見落として発券しました。到着地で入国を拒否されます。', '여권 유효기간이 지난 것을 놓치고 발권했습니다. 도착지에서 입국이 거부됩니다.', 'You missed the expired passport and issued. The passenger will be refused entry at arrival.')); }, 'passenger/1-3', 'pp-expired'); }
    if (c.flags.idWrong) { safetyMiss(c, L('本人と確認できない旅券で発券（別人の旅券）', '본인 확인이 안 된 여권으로 발권(다른 사람의 여권)', 'Issued on a passport that was not theirs'), 'id-mismatch'); note('bad', function () { return tx(L('写真の人物と目の前のお客様が別人でした。眉・鼻・耳・あごの形が違います。本人確認ができないときは保留して責任者に確認します。', '사진 속 인물과 눈앞의 승객이 다른 사람이었습니다. 눈썹·코·귀·턱 모양이 다릅니다. 본인 확인이 안 되면 보류하고 책임자에게 확인합니다.', 'The person in the photo was not the passenger: brows, nose, ears and jaw differ. When identity is unclear, hold and check with the supervisor.')); }, 'passenger/1-3', 'id-mismatch'); }
    if (has(p, 'noEsta') && !c.flags.denied) { safetyMiss(c, L('最終目的地（米国）の渡航認証がないまま発券', '최종 목적지(미국)의 여행 허가 없이 발권', 'Issued without travel authorisation for the final destination (US)'), 'esta-missing'); note('bad', function () { return tx(L('ESTAがないまま米国行きで発券しました。乗り継ぎ地で搭乗を断られるか、入国を拒否されます。', 'ESTA 없이 미국행으로 발권했습니다. 환승지에서 탑승이 거절되거나 입국이 거부됩니다.', 'You issued through to the US with no ESTA. The passenger will be refused boarding at the transit point or refused entry.')); }, 'ciq/1-2', 'esta-missing'); }
    else if (c.flags.estaSkip && !c.flags.estaChecked && !has(p, 'noEsta')) { safetyMiss(c, L('最終目的地の渡航認証（ESTA）を確認せずに発券', '최종 목적지의 여행 허가(ESTA)를 확인하지 않고 발권', 'Issued without checking the final-destination authorisation (ESTA)'), 'esta-check'); note('bad', function () { return tx(L('ESTAを確認せずに「条件を満たす」としました（今回は承認済みでした）。最終目的地の書類は必ず確かめます。', 'ESTA를 확인하지 않고 「조건 충족」으로 했습니다(이번에는 승인되어 있었음). 최종 목적지 서류는 반드시 확인합니다.', 'You marked the conditions as met without checking the ESTA (it happened to be approved). Always check final-destination documents.')); }, 'ciq/1-2', 'esta-check'); }
    /* 27차: 미국행으로 스루 태그를 했는데 안내하지 않음 */
    if (usThru(p) && !c.flags.denied && !c.flags.usNote && c.bags.some(function (b) { return b.tag && b.dest === p.conn.to; })) note('bad', function () { return tx(L('米国行きの手荷物について案内しませんでした。最初に到着する米国の空港で荷物を受け取って税関の検査を受けること（申告はお客様の責任）、TSAの検査のため鍵はかけないかTSAロックを使うことを伝えます。', '미국행 수하물에 대해 안내하지 않았습니다. 처음 도착하는 미국 공항에서 짐을 찾아 세관 검사를 받는 것(신고는 승객 책임), TSA 검사 때문에 잠그지 않거나 TSA 잠금장치를 쓰는 것을 전합니다.', 'You did not explain the US bag rules: collect bags at the first US airport for customs (declaring is the passenger\'s responsibility), and leave bags unlocked or use a TSA lock.')); }, 'passenger/1-10', 'us-notice');
    if (has(p, 'carry') && !c.flags.carryDone) { c.flags.carryDone = true; note('bad', function () { return tx(L('機内持ち込みを計りませんでした。重さの上限を超えたバッグが搭乗口で見つかり、出発の遅れにつながりました。', '기내 가방을 계량하지 않았습니다. 무게 상한을 넘은 가방이 탑승구에서 발견되어 출발 지연으로 이어졌습니다.', 'You did not weigh the carry-on. The overweight bag was found at the gate and delayed departure.')); }, 'passenger/1-10', 'carry-unchecked'); }
    if (c.flags.seqDup) { safetyMiss(c, L('手書き搭乗券のSEQが重複', '수기 탑승권 SEQ 중복', 'Duplicate SEQ on a handwritten boarding pass'), 'seq-dup'); note('bad', function () { return tx(L('SEQが他のお客様と重なりました。搭乗人数の照合ができなくなります。手作業では控えの次の番号を使います。', 'SEQ가 다른 승객과 겹쳤습니다. 탑승 인원 대조가 불가능해집니다. 수기에서는 사본의 다음 번호를 씁니다.', 'The SEQ clashed with another passenger, breaking the boarding head count. By hand, use the next number in the log.')); }, 'passenger/1-1', 'seq-dup'); }
    d3Issue(c, p);
    if (S.manual) { c.manual = true; S.manList.push(c); }
    c.bp = true; if (c.seqPicked) { S.seq = Math.max(S.seq, c.seqNo); } else { S.seq++; c.seqNo = S.seq; } addTime(M.cost.bp); sfx.print(); mood(+3); say('me', D.bpIssue);
    tabBP(); renderTabs();
  }
  var MISSL = {
    'visa-inad': L('査証の見落とし（入国拒否）', '비자 누락(입국 거부)', 'Missed visa (refused entry)'),
    'pb-hold': L('受託手荷物にモバイルバッテリー', '위탁 수하물에 보조배터리', 'Power bank left in a checked bag'),
    'dg-skip': L('保安質問の省略', '보안 질문 생략', 'Skipped security questions'),
    'pp-check': L('旅券確認の省略', '여권 확인 생략', 'Skipped passport checks'),
    'entry-check': L('渡航条件確認の省略', '입국 조건 확인 생략', 'Skipped entry check'),
    'pp-expired': L('期限切れ旅券の見落とし', '만료 여권 놓침', 'Missed an expired passport'),
    'id-mismatch': L('別人の旅券を見落とし', '다른 사람 여권 놓침', 'Missed someone else\'s passport'),
    'esta-missing': L('ESTAなしで米国行き発券', 'ESTA 없이 미국행 발권', 'Issued to the US with no ESTA'),
    'esta-check': L('ESTA確認の省略', 'ESTA 확인 생략', 'Skipped the ESTA check'),
    'tag-short': L('乗り継ぎ地までのタグ', '환승지까지만 태그', 'Tagged only to the transit point'),
    'promise-time': L('確認していない復旧時刻を約束', '확인하지 않은 복구 시각 약속', 'Promised an unconfirmed restore time'),
    'us-notice': L('米国行き手荷物の案内（税関・TSA）', '미국행 수하물 안내(세관·TSA)', 'US bag rules (customs, TSA)'),
    'over-reject': L('有効な旅券を「問題あり」に', '유효한 여권을 「문제 있음」으로', 'Flagged a valid passport'),
    'fee-golf': L('ゴルフバッグの料金', '골프백 요금', 'Golf bag fee'),
    'carry-over': L('機内持ち込み超過を通した', '기내 반입 초과를 통과', 'Let an overweight carry-on through'),
    'carry-unchecked': L('機内持ち込みを計らなかった', '기내 가방 계량 안 함', 'Did not weigh the carry-on'),
    'pb-carry': L('預けに変えた荷物に電池が残った', '위탁으로 바꾼 짐에 배터리가 남음', 'Batteries left in a bag switched to checked'),
    'pair-apart': L('お連れ様と離れた席', '일행과 떨어진 좌석', 'Companions seated apart'),
    'sv-miss': L('責任者への報告なし', '책임자 보고 없음', 'No report to the supervisor'),
    'accuse': L('お客様を問い詰めた', '승객을 추궁함', 'Confronted the passenger'),
    'inf-block': L('幼児連れの座席条件（機材変更後）', '유아 동반 좌석 조건(기재 변경 후)', 'Infant seat rules after the aircraft change'),
    'inf-pp-check': L('幼児の旅券確認なし', '유아 여권 확인 없음', 'Infant passport not checked'),
    'exit-noexplain': L('非常口の希望に理由を説明しなかった', '비상구 희망에 이유를 설명하지 않음', 'Did not explain why the exit row was not possible'),
    'exit-nosign': L('非常口座席の署名なし', '비상구 좌석 서명 없음', 'Exit row card not signed'),
    'exit-unbriefed': L('新しい非常口座席の説明・同意なし', '새 비상구 좌석 설명·동의 없음', 'New exit seat without briefing'),
    'bp-old': L('旧搭乗券を無効にしなかった', '이전 탑승권 무효화 안 함', 'Old boarding passes not voided'),
    'gate-notify': L('ゲートへの通知なし', '게이트 통보 없음', 'Gate not told'),
    'seq-dup': L('手書きSEQの重複', '수기 SEQ 중복', 'Duplicate manual SEQ'),
    'seat-dup': L('復旧後の座席重複', '복구 후 좌석 중복', 'Duplicate seat after the restore'),
    'recon-skip': L('復旧後の照合なし', '복구 후 대조 없음', 'No reconciliation after the restore'),
    'dcs-nosync': L('控えを確認せず手作業', '사본 확인 없이 수기', 'Manual work without checking the copies'),
    'dcs-wait': L('障害中に受付を止めた', '장애 중 접수 중단', 'Stopped check-in during the outage'),
    'delay-vague': L('遅延の事実を確認せずに案内', '지연 사실 확인 없이 안내', 'Announced the delay without confirming it'),
    'delay-stop': L('遅延で受付を止めた', '지연으로 접수 중단', 'Stopped check-in for the delay'),
    'delay-notice': L('遅延の案内・食事券なし', '지연 안내·식사 쿠폰 없음', 'No delay information or voucher'),
    'conn-miss': L('間に合わない乗り継ぎのまま発券', '맞출 수 없는 연결편 그대로 발권', 'Issued through on a missed connection'),
    'conn-over': L('間に合う乗り継ぎを「間に合わない」に', '맞출 수 있는 연결을 「맞출 수 없음」으로', 'Treated a workable connection as missed'),
    'conn-recheck': L('遅延後の乗り継ぎを再確認しなかった', '지연 후 연결 재확인 안 함', 'Did not recheck the connection'),
    'promise-hotel': L('承認のない宿泊の約束', '승인 없는 숙박 약속', 'Promised an unapproved hotel'),
    'promise': L('確認していない乗り継ぎの約束', '확인하지 않은 연결 약속', 'Promised an unchecked connection'),
    'argue': L('お詫びせず言い争いかけた', '사과 없이 언쟁할 뻔함', 'Argued instead of apologising'),
    'promise-comp': L('権限外の補償の約束', '권한 밖 보상 약속', 'Promised compensation without authority'),
    'comp-deny': L('規定の食事券を案内しなかった', '규정 식사 쿠폰 안내 안 함', 'Withheld the meal voucher'),
    'ob-involuntary': L('カウンターで搭乗をお断りしようとした', '카운터에서 탑승 거절하려 함', 'Tried to deny boarding at the counter'),
    'ob-ignore': L('予約超過に対応しなかった', '예약 초과에 대응하지 않음', 'Ignored the overbooking'),
    'ob-noconsent': L('同意なしで協力者に登録', '동의 없이 협력자로 등록', 'Listed a volunteer without consent'),
    'ob-protect': L('対象外の方に協力をお願いした', '대상 밖의 분에게 협력을 부탁함', 'Asked an excluded passenger to volunteer'),
    'ob-novol': L('協力者を募れなかった', '협력자를 찾지 못함', 'Found no volunteer'),
    'wch-assist': L('車いすの介助を手配しなかった', '휠체어 보조 수배 안 함', 'No wheelchair help arranged'), 'wch-code': L('車いすの区分の誤り（過剰）', '휠체어 구분 오류(과잉)', 'Wrong wheelchair code (more than needed)'), 'wch-under': L('車いすの区分の誤り（階段のない搭乗の漏れ）', '휠체어 구분 오류(계단 없는 탑승 누락)', 'Wrong wheelchair code (step-free boarding missed)'), 'wch-guess': L('ご本人に伺わずに区分を決めた', '본인에게 묻지 않고 구분 결정', 'Set the code without asking'),
    'um-handover': L('UMの引き渡し情報が不十分', 'UM 인계 정보 불충분', 'Incomplete UM handover'), 'um-stay': L('UMの保護者に残っていただくお願いなし', 'UM 보호자에게 남아 달라는 부탁 없음', 'UM guardian not asked to stay'), 'um-seat': L('UMの指定外の座席', 'UM 지정 밖 좌석', 'UM outside the designated seats'),
    'petc-over': L('PETCの重さ超過を機内に通した', 'PETC 무게 초과를 기내로 통과', 'Let an overweight PETC into the cabin'), 'avih-auto': L('条件を確かめずにAVIHへ', '조건 확인 없이 AVIH로', 'Switched to AVIH without the conditions'), 'pet-docs': L('ペットの検疫書類不足のまま受付', '반려동물 검역 서류 부족한 채 접수', 'Accepted a pet without quarantine papers'), 'pet-check': L('ペットの確認の省略', '반려동물 확인 생략', 'Skipped the pet checks'), 'pet-over-reject': L('そろっている書類を「不足」に', '갖춰진 서류를 「부족」으로', 'Flagged complete pet papers'), 'petc-seat': L('PETCの座席条件', 'PETC 좌석 조건', 'PETC seat rule'), 'fee-pet': L('PETC料金', 'PETC 요금', 'PETC fee'), 'fee-mob': L('車いすに手荷物料金', '휠체어에 수하물 요금', 'Charged for a wheelchair'),
    'preg-limit': L('妊娠週数・診断書の条件の見落とし', '임신 주수·소견서 조건 누락', 'Missed the pregnancy rule'), 'preg-over': L('搭乗できる妊娠中の方を保留', '탑승 가능한 임산부를 보류', 'Held a pregnant passenger who could fly'), 'preg-wrong': L('保留の理由の誤り', '보류 이유 오류', 'Held for the wrong reason'), 'preg-check': L('妊娠中の方の確認の省略', '임산부 확인 생략', 'Skipped the pregnancy check'),
    'fam-apart': L('お子様が保護者の隣でない', '어린이가 보호자 옆이 아님', 'Child not next to a parent'),
    'late-accept': L('締め切り後に自分の判断で受付', '마감 후 자기 판단으로 접수', 'Accepted after the close on your own'), 'late-etd': L('ETDを見て締め切りを延ばした', 'ETD를 보고 마감 연장', 'Extended the close because of the ETD'), 'late-noalt': L('次の便を案内しなかった', '다음 편을 안내하지 않음', 'No next flight offered'), 'promise-fee': L('権限外の手数料の約束', '권한 밖 수수료 약속', 'Promised a fee waiver without authority'),
    'entry-miss': L('渡航条件の判断', '입국 조건 판단', 'Entry decision'), 'ticketName-miss': L('予約の名前の判断', '예약 이름 판단', 'Booking-name decision'), 'photo-miss': L('写真の判断', '사진 판단', 'Photo decision')
  };
  /* 오답 코드 → 실제로 한 행동(기록용 키) */
  var ACT = { 'pp-expired': 'judged-valid-then-issued', 'id-mismatch': 'confirmed-identity-then-issued', 'esta-check': 'issued-without-esta-check', 'esta-missing': 'issued-without-esta', 'pb-carry': 'checked-carryon-without-removing-batteries', 'pb-hold': 'tagged-without-security-questions', 'dg-skip': 'tagged-without-security-questions', 'pp-check': 'issued-without-passport-checks', 'entry-check': 'issued-without-entry-check', 'visa-inad': 'issued-on-expired-visa', 'over-reject': 'flagged-valid-passport', 'fee-golf': 'waived-golf-fee', 'tag-short': 'tagged-to-transit-point', 'us-notice': 'did-not-explain-us-bag-rules', 'promise-time': 'promised-unconfirmed-restore-time', 'carry-over': 'let-overweight-carryon-through', 'carry-unchecked': 'did-not-weigh-carryon', 'pair-apart': 'seated-companions-apart', 'sv-miss': 'decided-without-supervisor', 'accuse': 'confronted-passenger', 'inf-block': 'left-infant-in-invalid-seat', 'exit-unbriefed': 'confirmed-exit-seat-without-briefing', 'bp-old': 'did-not-void-old-boarding-pass', 'gate-notify': 'did-not-notify-gate', 'seq-dup': 'reused-seq-number', 'seat-dup': 'left-duplicate-seat', 'recon-skip': 'skipped-reconciliation', 'dcs-nosync': 'manual-without-checking-copies', 'dcs-wait': 'stopped-check-in-during-outage', 'delay-vague': 'announced-delay-without-confirming', 'delay-stop': 'stopped-check-in-for-delay', 'delay-notice': 'did-not-inform-delay', 'conn-miss': 'issued-through-on-missed-connection', 'conn-over': 'flagged-workable-connection', 'conn-recheck': 'did-not-recheck-connection', 'promise-hotel': 'promised-unapproved-hotel', 'promise': 'promised-unchecked-connection', 'argue': 'argued-with-passenger', 'promise-comp': 'promised-unauthorised-compensation', 'comp-deny': 'withheld-meal-voucher', 'ob-involuntary': 'tried-denial-stopped-by-sv', 'ob-ignore': 'ignored-overbooking', 'ob-noconsent': 'listed-volunteer-without-consent', 'ob-protect': 'asked-excluded-passenger', 'ob-novol': 'no-volunteer-found', 'wch-assist': 'issued-without-wheelchair-help', 'wch-code': 'set-wrong-wheelchair-code', 'wch-under': 'arranged-less-support-than-needed', 'wch-guess': 'set-code-without-asking', 'um-handover': 'issued-incomplete-handover', 'um-stay': 'did-not-ask-guardian-to-stay', 'um-seat': 'seated-um-outside-list', 'petc-over': 'let-overweight-petc-in-cabin', 'avih-auto': 'switched-to-avih-automatically', 'pet-docs': 'accepted-without-quarantine-papers', 'pet-check': 'skipped-pet-checks', 'pet-over-reject': 'flagged-complete-pet-papers', 'petc-seat': 'petc-seat-rule', 'fee-pet': 'did-not-collect-petc-fee', 'fee-mob': 'charged-for-mobility-aid', 'preg-limit': 'issued-outside-pregnancy-rule', 'preg-over': 'held-eligible-pregnant-passenger', 'preg-wrong': 'held-for-wrong-reason', 'preg-check': 'skipped-pregnancy-check', 'fam-apart': 'seated-child-away-from-parent', 'late-accept': 'tried-to-accept-after-close', 'late-etd': 'extended-close-for-etd', 'late-noalt': 'offered-no-next-flight', 'promise-fee': 'promised-fee-waiver' };
  function missLabel(c) { if (MISSL[c]) return tx(MISSL[c]); if (LS[c]) return c + ' ' + tx(LS[c]); return c; }
  function safetyMiss(c, what, code) { S.strikes++; (S.safety = S.safety || []).push({ who: c.p.pp.sur + ' ' + c.p.pp.given, what: what, code: code }); }
  function bpHTML() {
    var c = S.cur, p = c.p, ap = R.airport[V.from], fl = c.vol ? V.alt.flight : V.flight, brd = brdOf(c), dep = c.vol ? V.alt.dep : S.delay ? V.etd : V.std;   /* 24차b(사용자 08:30): 출발 시각도 기재(지연이면 새 출발 예정) */
    return '<div class="bp' + (c.manual || S.manual ? ' manual' : '') + '"><div class="m"><div class="lab">Vela Air · Boarding pass' + (c.manual || S.manual ? ' · MANUAL' : '') + (S.delay ? ' · ETD ' + (c.vol ? V.alt.dep : V.etd) : '') + '</div><div class="big">' + p.pp.sur + '/' + p.pp.given + '</div>' +
      '<div class="grid"><span class="lab">Flight</span><span class="lab">From</span><span class="lab">To</span><span class="lab">Date</span><b class="mono">' + fl + '</b><b class="mono">' + V.from + '</b><b class="mono">' + V.to + '</b><b class="mono">' + M.date.slice(8) + 'OCT</b>' +
      '<span class="lab">Departs</span><span class="lab">Boarding</span><span class="lab">Gate</span><span class="lab">Seat</span><b class="mono">' + dep + '</b><b class="mono">' + brd + '</b><b class="mono">' + ap.gate + '</b><b class="mono">' + c.seat + '</b>' +
      '<span class="lab">Seq</span><span></span><span></span><span></span><b class="mono">' + ('00' + c.seqNo).slice(-3) + '</b></div>' +
      '<div class="bpnote">' + esc(tx(L('出発時刻の10分前までに搭乗口へお越しください。', '출발 시각 10분 전까지 탑승구로 와 주십시오.', 'Please be at the gate 10 minutes before departure.'))) + '</div>' +
      (p.inf ? '<div class="lab" style="margin-top:6px">+INF ' + p.inf.sur + '/' + p.inf.given + '</div>' : '') + (p.party ? '<div class="lab" style="margin-top:6px">' + p.party.map(function (m, i) { return '+ ' + m.sur + '/' + m.given + ' SEAT ' + ((c.famSeats || [])[i + 1] || '—'); }).join(' · ') + '</div>' : '') + (p.sup && p.sup.type === 'um' ? '<div class="lab" style="margin-top:6px">UMNR · ' + tx(L('引き渡し書あり', '인계서 있음', 'handover form attached')) + '</div>' : '') + (p.sup && p.sup.type === 'wch' && c.sup.code ? '<div class="lab" style="margin-top:6px">SSR ' + c.sup.code + '</div>' : '') + (p.sup && p.sup.type === 'pet' ? '<div class="lab" style="margin-top:6px">' + (c.sup.avih ? 'AVIH' : 'PETC') + ' DOG ' + (c.sup.w || '').toString() + 'KG</div>' : '') + (p.conn ? '<div class="lab" style="margin-top:6px">+ ' + p.conn.flight + ' ' + p.conn.from + '→' + p.conn.to + ' ' + p.conn.dep + ' · ' + tx(L('乗り継ぎ便の搭乗券（2枚目）', '연결편 탑승권(2장째)', 'Connecting boarding pass (2nd)')) + '</div>' : '') + '<div class="bars"></div></div>' +
      '<div class="s"><span>' + fl + '</span><span>' + V.from + '→' + V.to + '</span><span>SEAT ' + c.seat + '</span><span>GATE ' + ap.gate + '</span><span>BRD ' + brd + '</span><span>DEP ' + dep + '</span></div></div>';
  }
  /* 25차: 「다음 승객 ▶」 연결(언어 전환으로 탑승권 화면을 다시 그려도 같은 버튼) */
  function bindNextPax() { var b = $('#nextpax'); if (b) b.onclick = function () { sfx.tap(); if (S && S.leaveGo) S.leaveGo(true); }; }
  function endPax(denied) {
    var c = S.cur, p = c.p;
    if (S.leaving) return;
    /* D3-RR02: 최종 오답(d3End)을 먼저 확정한 뒤 자기수정 안내를 만든다 */
    d3End(c, p, denied);
    var sfx0 = (c.selfFix || []).filter(function (k) { return !c.notes.some(function (n) { return n.t === 'bad' && n.c === k; }); });
    var sfxU = (c.selfFix || []).filter(function (k) { return sfx0.indexOf(k) < 0; });
    if (sfxU.length && !c.selfUndoneNoted) { c.selfUndoneNoted = true; note('info', function () { return tx(L('一度は発券前に直しましたが、その後また誤った状態に戻って終わりました：', '발권 전에 한 번 바로잡았지만, 그 뒤 다시 잘못된 상태로 끝났습니다: ', 'You corrected this once before issuing, but it ended in the wrong state again: ')) + sfxU.map(function (k) { return missLabel(k); }).join(' / '); }, { conn: 'passenger/1-4', um: 'passenger/1-7', wch: 'passenger/1-7', pet: 'passenger/1-8', preg: 'passenger/1-6' }[sfxU[0].split('-')[0]] || 'passenger/1-3', 'self-fix-undone'); }
    if (sfx0.length && !c.selfNoted) { c.selfNoted = true; var sfl = { conn: 'passenger/1-4', um: 'passenger/1-7', wch: 'passenger/1-7', pet: 'passenger/1-8', preg: 'passenger/1-6', exit: 'passenger/1-5' }[sfx0[0].split('-')[0]] || 'passenger/1-3'; note('info', function () { return tx(L('最初の判断を、発券・受託の前に自分で見直して訂正しました：', '처음 판단을 발권·위탁 전에 스스로 다시 확인해 바로잡았습니다: ', 'You re-checked and corrected your first call before issuing or accepting: ')) + sfx0.map(function (k) { return missLabel(k); }).join(' / '); }, sfl, 'self-fix'); }
    say('me', denied ? D.deny : D.bye(R.airport[V.from].gate, brdOf(c)));
    if (S.delay && !denied && !c.delayTold && !c.dlNoted) { c.dlNoted = true; note('bad', function () { return tx(L('遅延（新しい出発予定・搭乗開始時刻）のご案内と、規定の食事券のお渡しをしませんでした。遅延中は、手続きするすべてのお客様に伝えます。', '지연(새 출발 예정·탑승 시작 시각) 안내와 규정 식사 쿠폰 전달을 하지 않았습니다. 지연 중에는 수속하는 모든 승객에게 알립니다.', 'You did not tell the passenger about the delay (new departure and boarding times) or hand over the meal voucher. During a delay, tell every passenger you check in.')); }, 'passenger/5-4', 'delay-notice'); }
    if (!denied && p.pair && p.pair.role === 'b' && !c.seatGood) note('bad', function () { return tx(L('お連れ様と離れた席になりました。別予約の同行者は、隣が空いている席を先に考えます。', '일행과 떨어진 자리가 되었습니다. 따로 예약한 동행자는 옆자리가 빈 좌석을 먼저 생각합니다.', 'The companions ended up apart. For companions on separate bookings, plan a seat with a free neighbour.')); }, 'passenger/1-5', 'pair-apart');
    if (!denied) { say('pax', p.say.thanks); if (c.seatGood && !c.vol) note('good', function () { return tx(L('お客様の希望に合う座席を割り当てました。', '승객 희망에 맞는 좌석을 배정했습니다.', 'You gave a seat that matched the request.')); }, 'passenger/1-5'); }
    if (denied && c.flags.handover && p.say.denyOk) say('pax', p.say.denyOk);
    c.denied = denied; STG.pose(denied ? 'explain' : 'greet');
    /* 대사가 끝날 때까지 기다린 뒤 승객이 떠나고 다음 승객으로 (음성 끔: 1.6초 읽을 시간) */
    S.leaving = true; document.body.classList.add('busy');
    var mine = S.cur, gone = false;
    /* 25차(사용자 10-14): 배웅 뒤 다음 승객까지 음성을 끝까지 기다려 약 10초(음성 끔 2.5초) 걸림 → 「다음 승객 ▶」으로 바로 넘길 수 있게.
       누르지 않으면 지금처럼 자동으로 넘어감. 근무 시각(가상 시계)과 점수에는 영향 없음 */
    function proceed(fast) {
      if (gone || S.cur !== mine || G.screen !== 'play') return; gone = true;
      var nb = $('#nextpax'); if (nb) nb.disabled = true;
      if (fast) VO.stop();
      var pw = $('#paxwrap'); if (pw) { pw.style.transform = 'translateX(-40%)'; pw.style.opacity = 0; }
      setTimeout(function () { if (S.cur !== mine || G.screen !== 'play') return; S.leaving = false; S.leaveGo = null; document.body.classList.remove('busy'); guide(''); say('me', ''); say('pax', ''); nextPax(); }, fast ? 250 : 900);
    }
    S.leaveGo = proceed;
    var by = $('#bye'), nxt = '<button class="btn pri nextpax" id="nextpax">' + esc(tx(L('次のお客様へ ▶', '다음 승객 ▶', 'Next passenger ▶'))) + '</button>';
    if (by) by.outerHTML = nxt; else if ($('#scr')) $('#scr').insertAdjacentHTML('beforeend', '<div class="btns">' + nxt + '</div>');
    bindNextPax();
    setTimeout(function () {
      VO.whenIdle(function () { if (!$('#paxwrap')) return; proceed(false); }, 12000);
    }, G.voice ? 300 : 1600);
  }

  /* ================= Day 2~ : 본인 대조·여권 만료·ESTA·골프백·기내 가방·SV 보고 ================= */
  function svReport(c) { c.svDone = true; }
  /* 사진 대조 창: 눈앞의 승객(본인 정면) ↔ 여권 사진. 판단이 어려우면 SV 확인도 정답(감점 없음) */
  function comparePhoto() {
    var c = S.cur, p = c.p;
    var me = 'passport_' + (p.photo && p.idMatch !== false ? p.photo : p.art.replace('passenger_', '')) + '_front_01';
    var face = STG.has(me) ? '<img class="as-passport-photo as-passport-photo--large" src="' + STG.src(me) + '" alt="">' : STG.face(p.art, 'ppface');
    var body = '<div class="cmpgrid"><figure><figcaption>' + esc(tx(L('目の前のお客様', '눈앞의 승객', 'The passenger in front of you'))) + '</figcaption>' + face + '</figure><figure><figcaption>' + esc(tx(L('旅券の写真', '여권 사진', 'Passport photo'))) + ' · ' + issuedOf(p).slice(0, 4) + '</figcaption>' + STG.portrait(p, 'large') + '</figure></div>' +
      '<p class="small">' + esc(tx(L('髪型・年齢・眼鏡は変わります。眉・鼻・耳・あごの形など変わりにくい特徴と、旅券の人定事項・文書の状態をあわせて見ます。', '머리 모양·나이·안경은 바뀝니다. 눈썹·코·귀·턱 모양처럼 잘 바뀌지 않는 특징과 여권의 인적사항·문서 상태를 함께 봅니다.', 'Hair, age and glasses change. Look at features that do not (brows, nose, ears, jaw), together with the passport details and document condition.'))) + '</p>';
    var opts = [
      { t: L('変わりにくい特徴が一致する ― ご本人と確認', '잘 바뀌지 않는 특징이 일치 — 본인으로 확인', 'The stable features match — identity confirmed'), id: 'same' },
      { t: L('追加で確認する（生年月日をうかがう・ほかの身分証を見せてもらう）', '추가로 확인한다(생년월일을 묻고 다른 신분증을 보여 달라고 한다)', 'Check further (ask the date of birth, see another ID)'), s: L('約1.5分', '약 1.5분', '~1.5 min'), id: 'more' },
      { t: L('判断できない ― 手続きを保留して責任者に確認する', '판단할 수 없음 — 수속을 보류하고 책임자에게 확인', 'Cannot tell — hold and check with the supervisor'), s: L('約3分', '약 3분', '~3 min'), id: 'sv' }];
    var card = openModalShell(L('写真とご本人の照合', '사진과 본인 대조', 'Matching the photo to the person'), body + opts.map(function (o, i) { return '<button class="opt" data-i="' + i + '">' + esc(tx(o.t)) + (o.s ? '<small>' + esc(tx(o.s)) + '</small>' : '') + '</button>'; }).join(''));
    S.modalRedraw = comparePhoto; STG.pose('check');
    card.querySelectorAll('.opt').forEach(function (b) { b.onclick = function () { var o = opts[+b.dataset.i]; closeModal(); if (!canEdit(c)) return; sfx.tap(); photoResult(o.id); }; });
  }
  function photoResult(how) {
    var c = S.cur; if (!canEdit(c)) return;   /* 25차(GPT 중점 확인): 발권 뒤·다른 승객으로 넘어간 뒤에는 사진 대조 결과를 바꾸지 않음 */
    var p = c.p, same = p.idMatch !== false;
    if (how === 'same') {
      c.chk.photo = 'ok'; addTime(.3);
      if (!same) { c.flags.idWrong = true; act(c, 'id-mismatch', c.fixTry['id-mismatch'] ? 'confirmed-again' : 'confirmed-wrong-person'); }
      else if (has(p, 'oldPhoto')) note('good', function () { return tx(L('古い写真でも、変わりにくい特徴で本人と確認しました。', '오래된 사진이지만 잘 바뀌지 않는 특징으로 본인임을 확인했습니다.', 'An old photo, but you confirmed identity from the stable features.')); }, 'passenger/1-3');
      tabPP(); renderTabs(); return;
    }
    if (how === 'more') {
      addTime(1.5); say('me', L('ご本人確認のため、いくつか確認させていただいてもよろしいでしょうか。', '본인 확인을 위해 몇 가지 확인해도 괜찮으시겠습니까?', 'May I confirm a few details to verify your identity?'));
      say('pax', p.say.more || L('はい、どうぞ。', '네, 그러세요.', 'Yes, of course.'));
      if (same) { c.chk.photo = 'ok'; if (has(p, 'oldPhoto')) note('good', function () { return tx(L('写真が古いため追加で確認し、生年月日とほかの身分証で本人と確認しました。', '사진이 오래되어 추가로 확인하고 생년월일과 다른 신분증으로 본인임을 확인했습니다.', 'The photo was old, so you checked further and confirmed identity with the date of birth and another ID.')); }, 'passenger/1-3'); tabPP(); renderTabs(); return; }
      return modal(L('ご本人と確認できません', '본인으로 확인되지 않습니다', 'Identity not confirmed'), tx(L('生年月日の答えが旅券と違う／ほかの身分証の名前が旅券と違う', '생년월일 답이 여권과 다름 / 다른 신분증의 이름이 여권과 다름', 'The date of birth given differs from the passport / the other ID shows a different name')),
        L('本人と確認できないまま発券しません。決めつけたり問い詰めたりせず、中立的に保留し、責任者・担当部署の確認を受けます。', '본인으로 확인되지 않은 채 발권하지 않습니다. 단정하거나 추궁하지 않고 중립적으로 보류한 뒤 책임자·담당 부서의 확인을 받습니다.', 'Never issue without confirming identity. Do not accuse or interrogate: hold neutrally and get the supervisor or the responsible department to check.'),
        [{ t: L('手続きを保留し、確認が必要だと丁寧に伝えて責任者に報告する', '수속을 보류하고 확인이 필요하다고 정중히 전한 뒤 책임자에게 보고한다', 'Hold, politely explain a check is needed, and report to the supervisor'), s: L('約3分', '약 3분', '~3 min'), run: function () { idHold(c, false); } },
         { t: L('「ご本人ではありませんよね？」と問い詰める', '「본인 아니시죠?」라고 추궁한다', 'Ask "This is not you, is it?"'), run: function () { say('pax', p.say.accuse); mood(-25); note('bad', function () { return tx(L('お客様を問い詰めました。決めつけず、事実と次の手順だけを伝えます。', '승객을 추궁했습니다. 단정하지 말고 사실과 다음 절차만 전합니다.', 'You confronted the passenger. Do not accuse — state the facts and the next step only.')); }, 'passenger/1-3', 'accuse'); idHold(c, true); } },
         { t: L('急いでいるので、このまま発券する', '급하니 그대로 발권한다', 'They are in a hurry — issue anyway'), lock: L('できません：本人確認ができないまま発券しない', '할 수 없음: 본인 확인이 안 된 채 발권하지 않음', 'Not allowed: never issue without confirming identity') }],
        'passenger/1-3', function () { endPax(true); });
    }
    if (how === 'sv') {
      addTime(3); svReport(c); c.svAsks++;
      say('me', L('確認が必要なため、責任者に確認いたします。少々お待ちください。', '확인이 필요한 사항이 있어 책임자에게 확인하겠습니다. 잠시만 기다려 주십시오.', 'I need to check this with my supervisor. Please give us a moment.'));
      if (same) { c.chk.photo = 'ok'; note('info', function () { return tx(L('責任者と一緒に確認し、ご本人と確認できました（判断に迷うときの確認は正しい行動です）。', '책임자와 함께 확인해 본인임을 확인했습니다(판단이 어려울 때 확인하는 것은 올바른 행동입니다).', 'You checked with the supervisor and identity was confirmed (asking when unsure is the right move).')); }, 'passenger/1-3'); tabPP(); renderTabs(); return; }
      idHold(c, false, true); endPax(true);
    }
  }
  function idHold(c, rude, viaSV) {
    fixDone(c, 'id-mismatch');
    c.chk.photo = 'ng'; c.flags.denied = true; c.flags.handover = true; svReport(c); mood(-10);
    if (!rude) note('good', function () { return tx(viaSV ? L('判断を保留して責任者に確認し、本人でないことが分かったため発券を止めました。', '판단을 보류하고 책임자에게 확인해 본인이 아님을 알고 발권을 멈췄습니다.', 'You held and checked with the supervisor; it was not the passport holder, so you stopped the issue.') : L('本人と確認できないため、決めつけずに保留し、責任者に報告しました。', '본인으로 확인되지 않아 단정하지 않고 보류한 뒤 책임자에게 보고했습니다.', 'Identity could not be confirmed, so you held without accusing and reported to the supervisor.')); }, 'passenger/1-3');
  }
  /* D2-01 출발일에 이미 만료된 여권 */
  function decideExpired() {
    var c = S.cur, p = c.p;
    say('me', L('恐れ入ります。旅券の有効期限が過ぎております。', '죄송합니다. 여권 유효기간이 지났습니다.', 'I am sorry, your passport has expired.')); say('pax', p.say.plea || L('えっ…', '네?…', 'What…?'));
    modal(L('旅券の有効期限が切れています', '여권 유효기간이 지났습니다', 'The passport has expired'), 'Date of expiry ' + p.pp.exp + ' / ' + tx(L('本日 ', '오늘 ', 'Today ')) + M.date,
      L('有効な旅券がなければ運送できません。発券を保留し、責任者に報告して、旅券の手続きと予約変更の方法を案内します。', '유효한 여권이 없으면 운송할 수 없습니다. 발권을 보류하고 책임자에게 보고한 뒤 여권 절차와 예약 변경 방법을 안내합니다.', 'We cannot carry a passenger without a valid passport. Hold the issue, report to the supervisor, and explain the passport procedure and how to change the booking.'),
      [{ t: L('発券を保留して責任者に報告し、旅券の手続きと予約変更の方法を案内する', '발권을 보류하고 책임자에게 보고한 뒤 여권 절차와 예약 변경 방법을 안내한다', 'Hold, report to the supervisor, and explain the passport procedure and booking change'), s: L('約4分', '약 4분', '~4 min'),
        run: function () { fixDone(c, 'pp-expired'); addTime(4); mood(-12); c.chk.validity = 'ng'; c.flags.denied = true; c.flags.handover = true; svReport(c); note('good', function () { return tx(L('期限切れの旅券に気づき、発券を保留して責任者に報告し、次の手続きを案内しました。', '만료된 여권을 알아차리고 발권을 보류해 책임자에게 보고한 뒤 다음 절차를 안내했습니다.', 'You spotted the expired passport, held the issue, reported to the supervisor and explained the next steps.')); }, 'passenger/1-3'); } },
       { t: L('自分で搭乗できないと伝えて、帰っていただく', '직접 탑승 불가를 전하고 돌려보낸다', 'Tell them yourself and send them away'), s: L('判断は正しいが、責任者への報告と案内がない', '판단은 맞지만 책임자 보고와 안내가 없음', 'Right call, but no report or guidance'),
        run: function () { fixDone(c, 'pp-expired'); addTime(2); mood(-30); c.chk.validity = 'ng'; c.flags.denied = true; note('bad', function () { return tx(L('搭乗できない判断は正しいものの、責任者への報告と次の手続きの案内がありませんでした。', '탑승 불가 판단은 맞았지만 책임자 보고와 다음 절차 안내가 없었습니다.', 'The refusal was right, but you did not report or explain the next steps.')); }, 'passenger/1-3', 'sv-miss'); } },
       { t: L('数週間だけなので発券する', '몇 주 지났을 뿐이니 발권한다', 'It is only a few weeks over — issue'), lock: L('できません：有効期限の切れた旅券では運送しない', '할 수 없음: 유효기간이 지난 여권으로는 운송하지 않음', 'Not allowed: never carry on an expired passport') }],
      'passenger/1-3', function () { if (c.flags.denied) endPax(true); else { tabPP(); renderTabs(); } });
  }
  /* D2-04b ESTA 미승인(VWP 이용 사례) */
  function decideEsta() {
    var c = S.cur, p = c.p;
    modal(L('最終目的地（米国）の渡航認証がありません', '최종 목적지(미국)의 여행 허가가 없습니다', 'No travel authorisation for the final destination (US)'), 'ESTA: NONE / US VISA: NONE',
      L('最終目的地の書類が整わないまま運送しません。承認の時期は約束せず申請方法を案内し、有効な承認か適格な書類を確認できてから手続きします。行程の変更は運賃と責任者の承認が必要です。', '최종 목적지 서류가 갖춰지지 않은 채 운송하지 않습니다. 승인 시기는 약속하지 않고 신청 방법을 안내하며, 유효한 승인이나 적격 서류를 확인한 뒤 수속합니다. 여정 변경은 운임과 책임자 승인이 필요합니다.', 'Do not carry without documents for the final destination. Explain how to apply without promising when it will be approved, and check in only once a valid approval or eligible document is confirmed. Itinerary changes need fare rules and supervisor approval.'),
      [{ t: L('手続きを保留し、ESTAの申請方法を案内（承認時期は約束しない）。承認を確認できたら再手続き。責任者に報告', '수속을 보류하고 ESTA 신청 방법을 안내(승인 시기는 약속하지 않음). 승인이 확인되면 다시 수속. 책임자에게 보고', 'Hold, explain how to apply for ESTA (no promise on timing), re-process once approved, and report to the supervisor'), s: L('約4分', '약 4분', '~4 min'),
        run: function () { fixDone(c, 'esta-missing'); addTime(4); mood(-10); c.chk.entry = 'ng'; c.flags.denied = true; c.flags.handover = true; svReport(c); say('pax', p.say.denyOk); note('good', function () { return tx(L('最終目的地の渡航認証がないことに気づき、保留して申請を案内し、責任者に報告しました。', '최종 목적지의 여행 허가가 없음을 알아차리고 보류한 뒤 신청을 안내하고 책임자에게 보고했습니다.', 'You noticed the missing travel authorisation, held, explained how to apply and reported to the supervisor.')); }, 'ciq/1-2'); } },
       { t: L('乗り継ぎ地までの搭乗券だけ発行する', '환승지까지만 탑승권을 발행한다', 'Issue a boarding pass to the transit point only'), lock: L('できません：最終目的地の書類不備を隠して途中まで発券しない（行程変更は運賃と責任者の承認が必要）', '할 수 없음: 최종 목적지 서류 미비를 숨기고 중간까지만 발권하지 않음(여정 변경은 운임과 책임자 승인 필요)', 'Not allowed: do not hide the document problem by issuing part of the way (changes need fare rules and supervisor approval)') },
       { t: L('すぐ承認されるはずなので発券する', '곧 승인될 테니 발권한다', 'It will surely be approved soon — issue'), lock: L('できません：承認を確認できないまま発券しない', '할 수 없음: 승인을 확인하지 않은 채 발권하지 않음', 'Not allowed: never issue without a confirmed approval') }],
      'ciq/1-2', function () { if (c.flags.denied) endPax(true); else { tabEntry(); renderTabs(); } });
  }
  /* D2-05 골프백: 일반 수하물 1개로 계산 */
  function decideGolf(i) {
    var c = S.cur, p = c.p, ap = R.airline.VELA, fee = ap.excessWeight[G.country], second = i >= ap.freeBag.Y.pcs, feeTxt = (fee.cur === 'JPY' ? '¥' : '₩') + fee.amt.toLocaleString();
    modal(L('ゴルフバッグのお預かり', '골프백 접수', 'Accepting a golf bag'), c.bags[i].w.toFixed(1) + ' kg · ' + tx(L((i + 1) + '個目', (i + 1) + '번째', 'piece ' + (i + 1))),
      L('Vela Air（教育用）：ゴルフバッグは通常の手荷物1個として数えます。大きさの料金はかかりませんが、重さ・個数の上限は同じです。カバーなど梱包を確認し、壊れやすい梱包であることの扱いを説明して記録します（すべての責任がなくなる「免責」ではありません）。', 'Vela Air(교육용): 골프백은 일반 수하물 1개로 계산합니다. 크기 요금은 없지만 무게·개수 상한은 같습니다. 커버 등 포장 상태와 파손 위험을 안내하고 기록합니다(모든 책임이 없어지는 「면책」이 아닙니다).', 'Vela Air (training): a golf bag counts as one ordinary piece. No size charge, but the same weight and piece limits apply. Check the packing (cover), explain how fragile packing is handled and record it — this is not a blanket waiver of liability.'),
      [{ t: L('通常の手荷物1個として数え、' + (second ? '2個目の追加料金（' + feeTxt + '）を案内。' : '') + '梱包を確認して壊れ物の扱いを説明し、FRAGILEタグ', '일반 수하물 1개로 계산하고 ' + (second ? '2번째 추가 요금(' + feeTxt + ')을 안내. ' : '') + '포장 상태와 파손 위험을 안내·기록하고 FRAGILE 태그', 'Count it as an ordinary piece' + (second ? ', explain the extra-piece fee (' + feeTxt + ')' : '') + ', check the packing, explain fragile handling and add a FRAGILE tag'), s: L('約2分', '약 2분', '~2 min'),
        run: function () { addTime(2); mood(-3); c.bags[i].ex = true; c.bags[i].fragile = true; if (second) S.revenue.push({ pax: p.pp.sur, amt: fee.amt, cur: fee.cur, what: 'EXTRA PIECE (GOLF)' }); say('pax', p.say.golfOk); note('good', function () { return tx(L('ゴルフバッグを通常の1個として数え、料金・梱包・壊れ物の扱いを案内しました。', '골프백을 일반 1개로 계산하고 요금·포장·파손 주의 처리를 안내했습니다.', 'You counted the golf bag as an ordinary piece and explained the fee, packing and fragile handling.')); }, 'passenger/1-10'); } },
       { t: L('ゴルフ用品なので無料で預かる', '골프 용품이니 무료로 맡는다', 'Golf equipment — accept it free'), s: L('Vela Air の規定にない免除', 'Vela Air 규정에 없는 면제', 'A waiver not in the Vela Air rules'),
        run: function () { addTime(1); c.bags[i].ex = true; note('bad', function () { return tx(L('ゴルフバッグを無料にしました。Vela Air では通常の1個として数え、無料の個数を超えれば追加料金です。', '골프백을 무료로 했습니다. Vela Air에서는 일반 1개로 계산하고 무료 개수를 넘으면 추가 요금입니다.', 'You let the golf bag go free. At Vela Air it counts as an ordinary piece; beyond the free allowance it is charged.')); }, 'passenger/1-10', 'fee-golf'); } },
       { t: L('壊れても一切責任を負わないという同意書にサインしてもらう', '파손돼도 일절 책임지지 않는다는 동의서에 서명받는다', 'Have them sign that the airline bears no liability at all'), lock: L('できません：すべての責任をなくす同意は求めない（教育用：梱包の状態を説明して記録）', '할 수 없음: 모든 책임을 없애는 동의는 요구하지 않음(교육용: 포장 상태를 설명하고 기록)', 'Not allowed: do not ask for a blanket waiver (training: explain the packing condition and record it)') }],
      'passenger/1-10', function () { tabBag(); renderTabs(); });
  }
  /* D2-06 기내 가방 계량 */
  function weighCarry() {
    var c = S.cur, p = c.p, ap = R.airline.VELA; addTime(M.cost.carry || .3); sfx.tap();
    c.carryW = p.carry;
    if (p.carry <= ap.cabinMaxKg) { tabBag(); renderTabs(); return; }
    modal(L('機内持ち込みの重さを超えています', '기내 반입 무게를 넘었습니다', 'The carry-on is over the limit'), p.carry.toFixed(1) + ' kg > ' + ap.cabinMaxKg + ' kg',
      L('この重さを超えた機内用バッグは預けに変えます。その前に、モバイルバッテリー・取り外した予備のリチウム電池は必ず取り出して機内へ。機器に入った電池は規定の条件で扱い、Vela Air では機内での携行を勧めます（電源を切る・損傷やリコール品でないか確認）。', '무게를 넘은 이 기내 가방은 위탁으로 바꿉니다. 그 전에 보조배터리·분리한 예비 리튬 배터리는 반드시 꺼내 기내로. 기기에 들어 있는 배터리는 규정 조건에 따라 다루며, Vela Air는 기내 휴대를 권장합니다(전원 끄기·손상·리콜품 여부 확인).', 'This overweight cabin bag will be checked in. First, power banks and loose spare lithium batteries must come out and go in the cabin. Batteries inside devices follow the rules; Vela Air recommends keeping devices in the cabin (switched off, not damaged or recalled).'),
      [{ t: L('預けに変える。先にモバイルバッテリー・予備電池を取り出して機内へ', '위탁으로 바꾼다. 먼저 보조배터리·예비 배터리를 꺼내 기내로', 'Check it in — but first take out the power bank and spare batteries for the cabin'), s: L('約3分', '약 3분', '~3 min'),
        run: function () { addTime(3); mood(-4); var kg = Math.round((p.carry - 2.6) * 10) / 10; p.bags.push({ kg: kg, prop: p.carryProp, conv: true }); c.bags.push({ w: null, tag: null }); p.carry = 2.6; c.carryW = 2.6; c.flags.carryDone = true; say('pax', p.say.carryOk); note('good', function () { return tx(L('機内持ち込みの超過に気づき、電池を取り出してから預けに変えました。', '기내 반입 초과를 알아차리고 배터리를 꺼낸 뒤 위탁으로 바꿨습니다.', 'You caught the overweight carry-on and took the batteries out before checking it.')); }, 'passenger/1-13'); } },
       { t: L('そのまま機内に持ち込んでもらう', '그대로 기내에 들고 가게 한다', 'Let them take it on board as is'), run: function () { c.flags.carryDone = true; c.flags.carryOver = true; note('bad', function () { return tx(L('重さの上限を超えた機内持ち込みを通しました。搭乗口で止められ、出発の遅れにつながります。', '무게 상한을 넘은 기내 가방을 통과시켰습니다. 탑승구에서 막혀 출발 지연으로 이어집니다.', 'You let an overweight carry-on through. It will be stopped at the gate and can delay departure.')); }, 'passenger/1-10', 'carry-over'); } },
       { t: L('そのまま預ける（中は確認しない）', '그대로 맡긴다(안은 확인하지 않음)', 'Check it as is (no look inside)'), run: function () { addTime(1); var kg = p.carry; p.bags.push({ kg: kg, prop: p.carryProp, conv: true }); c.bags.push({ w: null, tag: null }); p.carry = 1.0; c.carryW = 1.0; c.flags.carryDone = true; if (p.carryPB) { c.flags.pbCarry = true; } } }],
      'passenger/1-13', function () { tabBag(); renderTabs(); });
  }
  /* SV 버튼: 보고가 필요한 사안이면 그 사안의 처리로, 아니면 시간만 */
  function askSV() {
    var c = S.cur; if (!c || S.leaving) return;
    c.svAsks++; sfx.tap();
    var p = c.p;
    if (c.needSV && !c.svDone) {
      if (has(p, 'expired') && !c.flags.denied && !c.bp && c.pp) { if (c.flags.missed_validity) { c.flags.missed_validity = false; tryFix(c, 'pp-expired'); } c.svAsked = true; addTime(1); return decideExpired(); }
      if (has(p, 'brother') && !c.flags.denied && !c.bp && c.pp) { if (c.flags.idWrong) { c.flags.idWrong = false; tryFix(c, 'id-mismatch'); } return photoResult('sv'); }
      if (has(p, 'noEsta') && !c.flags.denied && !c.bp && c.flags.estaChecked) { if (c.flags.missed_entry) { c.flags.missed_entry = false; tryFix(c, 'esta-missing'); } addTime(1); return decideEsta(); }
    }
    var t = c.svAsks > 1 ? 3 : 2; addTime(t);
    say('me', L('確認が必要なため、責任者に確認いたします。少々お待ちください。', '확인이 필요한 사항이 있어 책임자에게 확인하겠습니다. 잠시만 기다려 주십시오.', 'I need to check this with my supervisor. Please give us a moment.'));
    var pend = c.needSV && !c.svDone;
    (function draw() { S.modalRedraw = draw; openModalShell(L('責任者（SV）の回答', '책임자(SV)의 답변', 'Supervisor (SV) answer'), '<p>' + esc(tx(pend ? L('状況を確認しました。まず必要な確認（旅券・渡航条件）を終えてから、内容を具体的に報告してください。', '상황을 확인했습니다. 먼저 필요한 확인(여권·입국 조건)을 마친 뒤 내용을 구체적으로 보고해 주세요.', 'Noted. Finish the checks you need (passport, entry) first, then report the specifics.') : L('今の情報では特に問題はありません。通常どおり手続きを進めてください。', '지금 정보로는 특별한 문제가 없습니다. 평소대로 수속을 진행해 주세요.', 'Nothing wrong based on what you have. Carry on as normal.'))) + '</p><p class="small">' + esc(tx(L('（約' + t + '分）', '(약 ' + t + '분)', '(~' + t + ' min)'))) + '</p><div class="btns"><button class="btn pri" id="svok">OK</button></div>');
    $('#svok').onclick = closeModal; })();
  }
  /* Day 2 힌트(코라돈) — 캠페인에서 켜면 최고 등급 A */
  function d2Hint(p) {
    if (S.delay && p.complain) return L('まず<b>お詫び</b>と確認できている事実。乗り継ぎは<b>遅延後の到着予定</b>で計算し直し、MCTと比べます。', '먼저 <b>사과</b>와 확인된 사실. 연결은 <b>지연 후 도착 예정</b>으로 다시 계산해 MCT와 비교합니다.', 'Start with an <b>apology</b> and confirmed facts. Recalculate the connection from the <b>delayed arrival</b> and compare with the MCT.');
    if (S.delay && p.conn) return L('乗り継ぎは<b>遅延後の到着予定</b>から計算し直しましょう。MCT<b>以上</b>なら元の便のまま。ESTAの確認も忘れずに。', '연결은 <b>지연 후 도착 예정</b>부터 다시 계산하세요. MCT <b>이상</b>이면 원래 편 그대로. ESTA 확인도 잊지 말고.', 'Recalculate from the <b>delayed arrival</b>. At or above the MCT, keep the original flight. Do not forget the ESTA.');
    if (S.delay && S.ob && S.ob.vol === p.id) return L('代替便への変更は確定済み。条件の説明と、旅券・手荷物の確認はいつもどおりです。', '대체편 변경은 확정됨. 조건 설명과 여권·수하물 확인은 평소대로입니다.', 'The change to the alternative flight is set. Explain the terms; passport and bag checks are as usual.');
    if (p.sup && p.sup.type === 'wch') return L('「サポート」タブで、まず<b>ご本人に移動のことを伺い</b>、WCHR／WCHS／WCHC を選んでから手配。非常口は不可。', '「지원」 탭에서 먼저 <b>본인에게 이동에 대해 여쭙고</b> WCHR / WCHS / WCHC를 고른 뒤 수배. 비상구 불가.', 'On the Assistance tab, <b>ask the passenger first</b>, choose WCHR / WCHS / WCHC, then arrange. No exit row.');
    if (p.sup && p.sup.type === 'um') return L('UMは<b>引き渡しの記録</b>が命綱。保護者の確認・申込書の<b>空欄</b>・署名とパウチ、保護者には出発まで残っていただく。', 'UM은 <b>인계 기록</b>이 생명줄. 보호자 확인·신청서의 <b>빈 칸</b>·서명과 파우치, 보호자는 출발까지 남아 달라고.', 'For a UM the <b>handover record</b> is the lifeline: guardian ID, <b>blanks</b> on the form, signature and pouch, and the guardian stays until departure.');
    if (p.sup && p.sup.type === 'pet') return L('ペットは<b>ケージごとの重さ</b>（8kg）と<b>行き先の国の検疫書類</b>。超えたら自動でAVIHにしない。料金も忘れずに。', '반려동물은 <b>케이지째 무게</b>(8kg)와 <b>행선지 나라의 검역 서류</b>. 넘으면 자동으로 AVIH로 하지 않음. 요금도 잊지 말고.', 'Pets: <b>weight with the carrier</b> (8kg) and the <b>destination\'s quarantine papers</b>. Over the limit is not an automatic AVIH. Collect the fee.');
    if (p.sup && p.sup.type === 'preg') return L('出産予定日から<b>搭乗日の週数</b>を計算（予定日＝40週0日）。単胎・多胎と<b>診断書の発行日</b>も確認。自分で診断しない。', '분만 예정일로 <b>탑승일 주수</b>를 계산(예정일 = 40주 0일). 단태·다태와 <b>소견서 발급일</b>도 확인. 직접 진단하지 않기.', 'Work out the <b>weeks on the day of travel</b> from the due date (due date = 40w0d). Check single/multiple and the <b>certificate date</b>. Do not diagnose.');
    if (p.party) return L('同行者の旅券も確認。座席は<b>お子様を保護者のすぐ隣</b>に（3席を順に選ぶ）。', '동행자 여권도 확인. 좌석은 <b>어린이를 보호자 바로 옆</b>에(3석을 차례로 선택).', 'Check the companions\' passports too. Seat the <b>child right next to a parent</b> (choose the three seats in turn).');
    if (has(p, 'expired') || has(p, 'shortValid')) return L('旅券の<b>有効期限</b>を本日の日付・復路の日付と比べましょう。短いだけなら問題ではありません。', '여권 <b>유효기간</b>을 오늘 날짜·귀국일과 비교하세요. 짧기만 하면 문제가 아닙니다.', 'Compare the passport <b>expiry</b> with today and the return date. Short is not the same as invalid.');
    if (has(p, 'oldPhoto') || has(p, 'brother')) return L('写真は<b>変わりにくい特徴</b>（眉・鼻・耳）で照合。迷ったら追加確認や責任者への確認は正しい行動です。', '사진은 <b>잘 바뀌지 않는 특징</b>(눈썹·코·귀)으로 대조. 헷갈리면 추가 확인이나 책임자 확인이 올바른 행동입니다.', 'Match the photo on <b>stable features</b> (brows, nose, ears). When unsure, checking further or asking the supervisor is right.');
    if (p.conn) return L('乗り継ぎ便は<b>最終目的地</b>の条件まで確認。ESTAの有無を確かめてから判断し、荷物は最終目的地までタグを。', '연결편은 <b>최종 목적지</b> 조건까지 확인. ESTA 유무를 확인한 뒤 판단하고, 짐은 최종 목적지까지 태그를.', 'For connections, check the <b>final destination</b>. Confirm the ESTA before deciding, and tag bags through.');
    if (has(p, 'golf')) return L('ゴルフバッグは Vela Air では<b>通常の1個</b>。2個目は料金がかかります。', '골프백은 Vela Air에서 <b>일반 1개</b>. 2개째는 요금이 붙습니다.', 'At Vela Air a golf bag is <b>an ordinary piece</b>. The second piece is charged.');
    if (has(p, 'carry')) return L('大きな機内用バッグ…<b>機内持ち込みを計って</b>みましょう。預ける前に電池を出すのを忘れずに。', '큰 기내 가방… <b>기내 가방을 계량</b>해 봅시다. 맡기기 전에 배터리 꺼내는 것을 잊지 말고.', 'That is a big cabin bag… <b>weigh the carry-on</b>. Take the batteries out before checking it.');
    if (has(p, 'infant')) return L('幼児連れのお客様：非常口は不可、同じ列（左右ブロック）に幼児連れを重ねない。', '유아 동반 승객: 비상구 불가, 같은 열(좌우 블록)에 유아 동반을 겹치지 않게.', 'Passenger with an infant: no exit row, and never two infants in the same row block.');
    if (p.pair) return p.pair.role === 'a' ? L('後ろのお連れ様と並べるよう、<b>隣が空いている席</b>を選びましょう。', '뒤의 일행과 나란히 앉도록 <b>옆자리가 비어 있는 좌석</b>을 고르세요.', 'Choose a seat <b>with a free seat next to it</b> for the companion behind.') : L('前のお連れ様の<b>すぐ隣</b>（同じ列・同じ側）に。', '앞 일행의 <b>바로 옆</b>(같은 열·같은 쪽)으로.', 'Put them <b>right next to</b> their companion (same row, same side).');
    /* 25차b(GPT 25-F01): Day 1 유형 + Day 2~5에도 나오는 이름·배터리·초과 수하물 힌트 */
    if (has(p, 'name')) return L('旅券と予約の<b>ローマ字の名前</b>を1文字ずつ照合。違っていたら、発券の前に規定にそって<b>予約の名前を旅券に合わせて訂正</b>します（APIは旅券の情報で送ります）。', '여권과 예약의 <b>로마자 이름</b>을 한 글자씩 대조. 다르면 발권 전에 규정에 따라 <b>예약 이름을 여권에 맞게 정정</b>합니다(API는 여권 정보로 송신).', 'Compare the <b>Romanized names</b> on the passport and the booking letter by letter. If they differ, <b>correct the booking to match the passport</b> under the rules before issuing (API data is sent from the passport).');
    if (has(p, 'infantExit')) return L('幼児にも<b>自分の旅券</b>が必要：有効期限・予約のINFTの名前・2歳未満かを確認。幼児連れは<b>非常口不可</b>、同じ列（左右ブロック）に幼児連れを重ねない。', '유아도 <b>자기 여권</b>이 필요: 유효기간·예약 INFT 이름·만 2세 미만인지 확인. 유아 동반은 <b>비상구 불가</b>, 같은 열(좌우 블록)에 유아 동반을 겹치지 않게.', 'Infants need <b>their own passport</b>: check its validity, the INFT name in the booking and that the child is under 2. With an infant: <b>no exit row</b>, and never two infants in the same row block.');
    if (has(p, 'battery')) return L('タグを付ける前に<b>保安質問</b>。モバイルバッテリーは受託できないので取り出してもらい、1個ずつ<b>Wh＝mAh×V÷1000</b>で区分します。Vela Air（教育用）は100Wh超をカウンターで承認しません。', '태그를 달기 전에 <b>보안 질문</b>. 보조배터리는 위탁할 수 없으므로 꺼내게 하고, 1개씩 <b>Wh = mAh × V ÷ 1000</b>으로 구분합니다. Vela Air(교육용)는 100Wh 초과를 카운터에서 승인하지 않습니다.', 'Ask the <b>security questions</b> before tagging. Power banks cannot go in checked bags: have them taken out and band each one by <b>Wh = mAh × V ÷ 1000</b>. Vela Air (training) does not approve anything over 100Wh at the counter.');
    if (has(p, 'overweight')) return L('無料は<b>1個23kg</b>（1個の上限32kg）。超えたら超過分と料金を示し、<b>支払う</b>か<b>機内に移す</b>かをお客様に選んでいただいてから、タグを付けます。', '무료는 <b>1개 23kg</b>(1개 상한 32kg). 넘으면 초과분과 요금을 보여 주고, <b>지불</b>할지 <b>기내로 옮길지</b> 승객이 고르게 한 뒤 태그를 답니다.', 'The free allowance is <b>one piece of 23kg</b> (32kg max per piece). If over, show the excess and the fee, let the passenger choose to <b>pay</b> or <b>move items to the cabin</b>, then tag.');
    if (has(p, 'visa')) return L('「渡航条件」で国籍ごとの条件を確認。査証が必要なら、「旅券」タブの査証欄の<b>有効期限</b>を今日の日付と比べます。切れていたら発券せず、理由をご説明してSVに引き継ぎます。', '「입국 조건」에서 국적별 조건을 확인. 비자가 필요하면 「여권」 탭 비자 면의 <b>유효기간</b>을 오늘 날짜와 비교합니다. 지났으면 발권하지 않고 이유를 설명한 뒤 SV에 인계합니다.', 'Check the rules for the nationality under <b>Entry</b>. If a visa is needed, compare its <b>expiry</b> on the Passport tab with today. If it has expired, do not issue: explain why and hand over to the SV.');
    if (S.delay) return L('遅延中も旅券・渡航条件・保安質問の確認はいつもどおり。画面上の帯から、<b>遅延の案内と食事券</b>を。', '지연 중에도 여권·입국 조건·보안 질문 확인은 평소대로. 화면 위 띠에서 <b>지연 안내와 식사 쿠폰</b>을.', 'Passport, entry and security checks stay the same during a delay. Use the strip at the top for <b>delay information and the voucher</b>.');
    return '';
  }

  /* ================= Day 4 : 기재 변경(E4-01) · DCS 장애와 수기 체크인(E4-02) · 복구 대조 ================= */
  function noteTo(r, type, fn, lesson, code) { r.notes.push({ t: type, x: fn, l: lesson, c: code }); }
  function evCheck(id, ok) { S.evChecks.push({ id: id, ok: !!ok }); }
  function blockOf(id) { return parseInt(id, 10) + ('ABC'.indexOf(id.slice(-1)) >= 0 ? 'L' : 'R'); }
  function infClash(id) { var b = blockOf(id), n = 0; S.infantSeats.forEach(function (s) { if (s !== id && blockOf(s) === b) n++; }); return n > 0; }
  /* E4-01: 4번째 승객 뒤 — DCS가 자동으로 새 좌석을 정함. 직원은 예외(비상구·유아 블록·일행)를 찾아 고치고, SV 승인·탑승권 재발행·게이트 통보 */
  function runSwap() {
    var B = M.layoutB;
    var rows = S.results.slice(0, M.events.swapAfter).filter(function (r) { return !r.denied && r.seat; }).map(function (r) { return { r: r, old: r.seat, cur: r.p.auto || r.seat, ok: false, briefed: false, pick: false }; });
    S.ac = B; S.seats = B.taken.slice(); S.infantSeats = B.infantSeats.slice();
    rows.forEach(function (x) { S.seats.push(x.cur); if (x.r.p.inf) S.infantSeats.push(x.cur); });
    S.e1 = { rows: rows, sv: false, bp: false, gate: false };
    addTime(2); STG.pose('explain'); sfx.ng(); drawSwap();
  }
  function drawSwap() {
    var E = S.e1, B = M.layoutB, all = E.rows.every(function (x) { return x.ok; });
    /* 각 작업은 처리한 좌석안(swapSig)에 묶임 — 좌석이 실제로 바뀌면 다시 필요(stale) */
    function lab(k, ja, ko, en) { var d = swapDone(k), st = E[k] && !d; return (d ? '✓ ' : '') + esc(tx(L(ja, ko, en))) + (st ? ' <span class="pill warn">' + esc(tx(L('座席が変わったので再度必要', '좌석이 바뀌어 다시 필요', 'Seats changed — needed again'))) + '</span>' : ''); }
    var h = '<div class="must">' + STG.mascot('korarin', 'idle', 'km') + '<div><b>' + esc(tx(L('責任者（SV）から電話', '책임자(SV)의 전화', 'Call from the supervisor (SV)'))) + '</b> ' + esc(tx(L('「機材変更です。A配置からB配置（26列・156席、非常口は12列だけ）に変わります。予約のお客様は全員乗れます。DCSが自動で座席を割り当て直したので、チェックイン済みのお客様の新しい座席を確認して、例外を直してください。」', '「기재 변경입니다. A 배치에서 B 배치(26열·156석, 비상구는 12열뿐)로 바뀝니다. 예약 승객은 모두 탈 수 있습니다. DCS가 자동으로 좌석을 다시 배정했으니 체크인한 승객의 새 좌석을 확인하고 예외를 고쳐 주세요.」', '"Aircraft change: layout A becomes layout B (26 rows, 156 seats, exit row 12 only). Everyone booked still fits. The DCS has re-seated people automatically — check the new seats of those already checked in and fix any exceptions."'))) + '</div></div>';
    h += '<p class="small">' + esc(tx(L('確認する点：非常口座席の条件と同意・署名／幼児連れは同じ列（左右ブロック）に重ねない・非常口不可／同行者は隣同士／旧搭乗券の無効化とゲートへの通知', '확인할 점: 비상구 좌석 조건과 동의·서명 / 유아 동반은 같은 열(좌우 블록)에 겹치지 않게·비상구 불가 / 동행자는 나란히 / 이전 탑승권 무효화와 게이트 통보', 'Check: exit-row conditions, consent and signature / infants not in the same row block and never in an exit row / companions together / old boarding passes voided and the gate told'))) + '</p>';
    h += E.rows.map(function (x, i) {
      var p = x.r.p, ex = B.exitRows.indexOf(parseInt(x.cur, 10)) >= 0, tags = [];
      if (p.inf) tags.push('INF');
      if (p.pair) tags.push(tx(L('同行者（別予約）', '동행자(별도 예약)', 'Companion (separate booking)')));
      if (x.r.flags.exitOK) tags.push(x.r.flags.exitSigned ? tx(L('A配置で非常口に同意・署名済み', 'A 배치에서 비상구 동의·서명함', 'Agreed and signed for an exit row on layout A')) : tx(L('A配置で非常口に口頭同意のみ', 'A 배치에서 비상구 구두 동의만', 'Oral consent only for an exit row on layout A')));
      var line = '<div class="swrow' + (x.ok ? ' done' : '') + '"><div><b>' + p.pp.sur + ' ' + p.pp.given + '</b> <span class="small">' + esc(tags.join(' · ')) + '</span><div class="mono small">' + x.old + ' → <b>' + x.cur + '</b>' + (ex ? ' <span class="pill warn">EXIT</span>' : '') + (x.briefed ? ' ✓' : '') + '</div></div>';
      if (x.ok) line += '<span class="pill ok">' + esc(tx(L('確定', '확정', 'Confirmed'))) + '</span> <button class="btn ghost rebtn" data-a="undo" data-i="' + i + '">' + esc(tx(L('やり直す', '다시 하기', 'Redo'))) + '</button>';
      else line += '<div class="btns" style="margin:0"><button class="btn pri" data-a="ok" data-i="' + i + '">' + esc(tx(L('この座席で確定', '이 좌석으로 확정', 'Confirm this seat'))) + '</button><button class="btn" data-a="move" data-i="' + i + '">' + esc(tx(L('座席を変える', '좌석 변경', 'Change seat'))) + '</button>' + (ex && !x.briefed ? '<button class="btn" data-a="brief" data-i="' + i + '">' + esc(tx(L('非常口の条件を説明し、同意と署名をいただく', '비상구 조건을 설명하고 동의·서명 받기', 'Explain the exit row, get consent and a signature'))) + '</button>' : '') + '</div>';
      line += '</div>';
      if (x.pick) line += seatPicker(i);
      return line;
    }).join('');
    h += '<div id="whybox"></div><div class="btns">' +
      '<button class="btn" data-a="sv" ' + (all && !swapDone('sv') ? '' : 'disabled') + '>' + lab('sv', '再割り当て案をSVに報告し承認を得る', '재배정안을 SV에 보고하고 승인받기', 'Report the re-seating to the SV and get approval') + '</button>' +
      '<button class="btn" data-a="bp" ' + (all && !swapDone('bp') ? '' : 'disabled') + '>' + lab('bp', '新しい搭乗券を発行し、旧搭乗券を無効にする', '새 탑승권 발행·이전 탑승권 무효화', 'Issue new boarding passes and void the old ones') + '</button>' +
      '<button class="btn" data-a="gate" ' + (all && !swapDone('gate') ? '' : 'disabled') + '>' + lab('gate', 'ゲートに座席変更を通知する', '게이트에 좌석 변경 통보', 'Tell the gate about the seat changes') + '</button>' +
      '<button class="btn pri" data-a="done" ' + (all ? '' : 'disabled') + '>' + esc(tx(L('完了して次のお客様へ', '완료하고 다음 승객으로', 'Finish and call the next passenger'))) + '</button></div>';
    var card = openModalShell(L('機材変更 ― 再割り当ての確認', '기재 변경 — 재배정 확인', 'Aircraft change — check the re-seating'), h);
    S.modalRedraw = drawSwap;
    card.onclick = function (e) { var b = e.target.closest('[data-a]'); if (!b || b.disabled) return; swapAct(b.dataset.a, +b.dataset.i, b.dataset.seat); };
  }
  function seatPicker(i) {
    var B = M.layoutB, x = S.e1.rows[i], h = '<div class="seatwrap mini"><div class="seatmap">';
    for (var r = 1; r <= B.rows; r++) {
      h += '<div class="rn">' + r + '</div>';
      for (var k = 0; k < 6; k++) {
        if (k === 3) h += '<div></div>';
        var id = r + B.cols[k], cls = 'seat', dis = '';
        if (S.seats.indexOf(id) >= 0 && id !== x.cur) { cls += ' taken'; dis = 'disabled'; }
        if (B.exitRows.indexOf(r) >= 0) cls += ' exit';
        if (S.infantSeats.indexOf(id) >= 0 && id !== x.cur) cls += ' inf';
        if (id === x.cur) cls += ' sel';
        h += '<button class="' + cls + '" data-a="pick" data-i="' + i + '" data-seat="' + id + '" ' + dis + ' aria-label="' + id + '">' + B.cols[k] + '</button>';
      }
    }
    return h + '</div></div>';
  }
  function swapAct(a, i, seat) {
    var E = S.e1, B = M.layoutB, x = E.rows[i];
    if (a === 'move') { E.rows.forEach(function (y, j) { y.pick = j === i ? !y.pick : false; }); sfx.tap(); return drawSwap(); }
    if (a === 'pick') {
      S.seats.splice(S.seats.indexOf(x.cur), 1); if (x.r.p.inf) S.infantSeats.splice(S.infantSeats.indexOf(x.cur), 1);
      x.cur = seat; x.briefed = false; x.pick = false; S.seats.push(seat); if (x.r.p.inf) S.infantSeats.push(seat);
      addTime(.5); sfx.tap(); return drawSwap();
    }
    if (a === 'brief') {
      if (x.r.p.inf) { sfx.ng(); $('#whybox').innerHTML = '<div class="why bad">' + esc(tx(L('できません：幼児連れのお客様は非常口座席に座れません。座席を変えてください。', '할 수 없음: 유아 동반 승객은 비상구 좌석에 앉을 수 없습니다. 좌석을 바꾸세요.', 'Not allowed: passengers with infants cannot sit in an exit row. Change the seat.'))) + '</div>'; return; }
      x.briefed = true; addTime(1); sfx.ok(); return drawSwap();
    }
    if (a === 'ok') { x.ok = true; x.pick = false; x.okBad = swapProblem(x); if (x.okBad) act(x.r, x.okBad, 'confirmed-with-problem'); addTime(.3); sfx.tap(); return drawSwap(); }
    if (a === 'undo') { if (x.okBad) { x.tried = x.okBad; act(x.r, x.okBad, 'recheck'); } x.ok = false; x.okBad = null; addTime(.3); sfx.tap(); return drawSwap(); }
    if (a === 'sv') { if (E.sv) E.svRedo = (E.svRedo || 0) + 1; E.sv = swapSig(); addTime(2); sfx.tap(); return drawSwap(); }
    if (a === 'bp') { if (E.bp) E.bpRedo = (E.bpRedo || 0) + 1; E.bp = swapSig(); addTime(1.5); sfx.print(); return drawSwap(); }
    if (a === 'gate') { if (E.gate) E.gateRedo = (E.gateRedo || 0) + 1; E.gate = swapSig(); addTime(1); sfx.tap(); return drawSwap(); }
    if (a === 'done') return finishSwap();
  }
  /* 재배정안의 서명: 승객별 최종 좌석. 승인·재발행·통보는 처리 당시의 서명을 저장하고, 최종 안과 같을 때만 완료로 인정 */
  function swapSig() { return S.e1.rows.map(function (x) { return x.r.p.id + ':' + x.cur; }).join('|'); }
  function swapDone(k) { return !!S.e1[k] && S.e1[k] === swapSig(); }
  /* 재배정 행의 문제(확정 순간 기준): 유아 블록·비상구 미설명 */
  function swapProblem(x) { var B = M.layoutB, ex = B.exitRows.indexOf(parseInt(x.cur, 10)) >= 0; if (x.r.p.inf && (ex || infClash(x.cur))) return 'inf-block'; if (ex && !x.r.p.inf && !x.briefed) return 'exit-unbriefed'; return null; }
  function finishSwap() {
    var E = S.e1, B = M.layoutB, okExit = true, okInf = true, okPair = true;
    /* 최종 좌석안 기준으로 완료 여부를 다시 계산(이전 안에서 한 작업은 승계하지 않음) */
    var stale = { sv: !!E.sv && !swapDone('sv'), bp: !!E.bp && !swapDone('bp'), gate: !!E.gate && !swapDone('gate') };
    E.svOk = swapDone('sv'); E.bpOk = swapDone('bp'); E.gateOk = swapDone('gate'); E.stale = stale; E.finalSig = swapSig();
    E.rows.forEach(function (x) {
      var r = x.r, p = r.p, ex = B.exitRows.indexOf(parseInt(x.cur, 10)) >= 0;
      if (x.cur !== x.old) r.seatWas = x.old;
      r.seat = x.cur;
      if (p.inf && (ex || infClash(x.cur))) { okInf = false; safetyMiss(r, L('機材変更後、幼児連れのお客様が非常口または幼児の重なる列のまま', '기재 변경 후 유아 동반 승객이 비상구 또는 유아가 겹치는 열에 그대로', 'After the aircraft change, a passenger with an infant was left in an exit row or a row block with another infant'), 'inf-block'); noteTo(r, 'bad', function () { return tx(L('B配置で幼児連れのお客様の座席が条件に合っていませんでした（予備の酸素マスク・非常口）。', 'B 배치에서 유아 동반 승객의 좌석이 조건에 맞지 않았습니다(예비 산소마스크·비상구).', 'On layout B the infant passenger\'s seat broke the rules (spare oxygen masks, exit row).')); }, 'passenger/1-5', 'inf-block'); }
      else if (ex && !p.inf && !x.briefed) { okExit = false; safetyMiss(r, L('B配置の非常口座席に、条件の確認と同意なしで割り当て', 'B 배치 비상구 좌석에 조건 확인·동의 없이 배정', 'Assigned an exit row on layout B without the check and consent'), 'exit-unbriefed'); noteTo(r, 'bad', function () { return tx(L('B配置では非常口が12列に変わりました。新しく非常口座席になったお客様には、条件の説明と同意が必要です。', 'B 배치에서는 비상구가 12열로 바뀌었습니다. 새로 비상구 좌석이 된 승객에게는 조건 설명과 동의가 필요합니다.', 'On layout B the exit row moved to row 12. A passenger newly in an exit seat needs the explanation and consent.')); }, 'passenger/1-5', 'exit-unbriefed'); }
    });
    /* 「完了」 전에 다시 하기로 바로잡은 행은 자가 수정(실제로 문제가 해소된 경우만) */
    E.rows.forEach(function (x) { if (x.tried && !swapProblem(x)) { selfFix(x.r, x.tried); act(x.r, x.tried, 'corrected'); var cd = x.tried; noteTo(x.r, 'info', function () { return tx(L('いったん確定した座席を、完了の前に見直して直しました：', '한 번 확정한 좌석을 완료 전에 다시 보고 고쳤습니다: ', 'You re-checked and fixed a confirmed seat before finishing: ')) + missLabel(cd); }, 'passenger/1-5', 'self-fix'); } });
    var pa = E.rows.filter(function (x) { return x.r.p.pair; });
    if (pa.length === 2 && nextTo(pa[0].cur).indexOf(pa[1].cur) < 0) { okPair = false; var rb = pa[1].r; noteTo(rb, 'bad', function () { return tx(L('機材変更の自動割り当てで離れた同行者を、隣同士に戻しませんでした。', '기재 변경 자동 배정으로 떨어진 동행자를 다시 나란히 앉히지 않았습니다.', 'The auto re-seating split the companions and you did not put them back together.')); }, 'passenger/1-5', 'pair-apart'); }
    var moved = E.rows.filter(function (x) { return x.cur !== x.old; });
    var staleNote = function () { return tx(L('（一度は処理しましたが、その後に座席を変えたので、最終の座席案には反映されていません。）', '(한 번은 처리했지만 그 뒤에 좌석을 바꿔 최종 좌석안에는 반영되지 않았습니다.)', '(You did it once, but changed seats afterwards, so it does not cover the final plan.)')); };
    if (!E.bpOk && moved.length) { safetyMiss(moved[0].r, L('機材変更後も旧搭乗券が有効のまま（座席の重複）', '기재 변경 후에도 이전 탑승권이 유효한 채(좌석 중복)', 'Old boarding passes left valid after the aircraft change (duplicate seats)'), 'bp-old'); noteTo(moved[0].r, 'bad', function () { return tx(L('座席が変わったお客様の旧搭乗券を無効にしていません。搭乗口で同じ座席が重なります。', '좌석이 바뀐 승객의 이전 탑승권을 무효화하지 않았습니다. 탑승구에서 같은 좌석이 겹칩니다.', 'You did not void the old boarding passes; seats will clash at the gate.')) + (stale.bp ? ' ' + staleNote() : ''); }, 'passenger/1-5', 'bp-old'); if (stale.bp) act(moved[0].r, 'bp-old', 'issued-for-earlier-plan'); }
    if (!E.gateOk) noteTo(E.rows[0].r, 'bad', function () { return tx(L('ゲートに座席変更を通知していません。', '게이트에 좌석 변경을 통보하지 않았습니다.', 'You did not tell the gate about the seat changes.')) + (stale.gate ? ' ' + staleNote() : ''); }, 'passenger/1-5', 'gate-notify');
    if (!E.svOk) noteTo(E.rows[0].r, 'bad', function () { return tx(L('再割り当て案をSVに報告・承認を得ずに確定しました。', '재배정안을 SV에 보고·승인받지 않고 확정했습니다.', 'You finalised the re-seating without reporting it to the SV for approval.')) + (stale.sv ? ' ' + staleNote() : ''); }, 'passenger/1-5', 'sv-miss');
    /* 성공 안내는 실제로 한 작업만 말함: 통보까지 했을 때만 「통보까지」 */
    if (okExit && okInf && okPair && E.bpOk && E.gateOk) noteTo(E.rows[0].r, 'good', function () { return tx(L('機材変更で自動割り当ての例外を見つけて直し、搭乗券の再発行とゲートへの通知まで終えました。', '기재 변경에서 자동 배정의 예외를 찾아 고치고 탑승권 재발행과 게이트 통보까지 마쳤습니다.', 'You found and fixed the exceptions in the auto re-seating, reissued boarding passes and told the gate.')); }, 'passenger/1-5');
    else if (okExit && okInf && okPair && E.bpOk) noteTo(E.rows[0].r, 'good', function () { return tx(L('自動割り当ての例外の修正と搭乗券の再発行は正確でした。', '자동 배정 예외 수정과 탑승권 재발행은 정확했습니다.', 'Fixing the auto re-seating exceptions and reissuing the boarding passes were done correctly.')); }, 'passenger/1-5');
    evCheck('swap-exit', okExit); evCheck('swap-inf', okInf); evCheck('swap-pair', okPair); evCheck('swap-bp', E.bpOk); evCheck('swap-gate', E.gateOk);
    S.evRep.need++; if (E.svOk) S.evRep.done++;
    E.done = true; closeModal(); nextPax();
  }
  /* E4-02: DCS 장애 */
  function runDcsDown() {
    S.e2 = { sync: false }; sfx.ng(); STG.pose('explain');
    var mon = document.querySelector('#stage .monitor'); if (mon) mon.style.filter = 'brightness(.25)';
    modal(L('チェックイン端末（DCS）が使えません', '체크인 단말(DCS)을 쓸 수 없습니다', 'The check-in system (DCS) is down'), tx(L('全カウンターで応答なし・復旧見込み未定', '모든 카운터 응답 없음·복구 예정 미정', 'No response at any counter · no restore time yet')),
      L('障害が起きた時点で処理を止め、責任者に報告して指示を受けます。最新の座席表・SEQ・手荷物リストの控えを確認し、担当を決めて手作業に切り替えます。オンラインと手作業で同時に発券しません。保安質問や旅券の確認は手作業でも同じです。', '장애가 난 시점에서 처리를 멈추고 책임자에게 보고해 지시를 받습니다. 최신 좌석표·SEQ·수하물 목록 사본을 확인하고 담당을 정해 수기로 전환합니다. 온라인과 수기로 동시에 발권하지 않습니다. 보안 질문과 여권 확인은 수기에서도 같습니다.', 'Stop where you are, report to the supervisor and take instructions. Check the latest copies of the seat chart, SEQ and bag list, assign roles and switch to manual. Never issue online and by hand at the same time. Security questions and passport checks are the same by hand.'),
      [{ t: L('SVに報告して指示を受け、座席表・SEQ・手荷物リストの最新の控えを確認してから手作業に切り替える', 'SV에 보고해 지시를 받고 좌석표·SEQ·수하물 목록의 최신 사본을 확인한 뒤 수기로 전환한다', 'Report to the SV, take instructions, check the latest copies of the seat chart, SEQ and bag list, then switch to manual'), s: L('約3分', '약 3분', '~3 min'),
        run: function () { addTime(3); S.manual = true; S.e2.sync = true; S.manList = []; evCheck('dcs-start', true); S.evRep.need++; S.evRep.done++; } },
       { t: L('控えを確認せず、すぐ手書きで続ける', '사본을 확인하지 않고 바로 손으로 계속한다', 'Carry on by hand straight away without checking the copies'),
        run: function () { addTime(.5); S.manual = true; S.e2.sync = false; S.manList = []; evCheck('dcs-start', false); S.evRep.need++; if (S.cur) note('bad', function () { return tx(L('障害の時点の座席表・SEQの控えを確認せずに手作業を始めました。オンライン側と座席やSEQが重なるおそれがあります。', '장애 시점의 좌석표·SEQ 사본을 확인하지 않고 수기를 시작했습니다. 온라인 쪽과 좌석·SEQ가 겹칠 수 있습니다.', 'You started manual work without checking the seat chart and SEQ copies; seats and SEQ may clash with online.')); }, 'passenger/1-1', 'dcs-nosync'); } },
       { t: L('システムが戻るまで受付を止めて待つ', '시스템이 돌아올 때까지 접수를 멈추고 기다린다', 'Stop and wait until the system is back'), s: L('復旧まで約12分（見込みは不明）', '복구까지 약 12분(예상은 불명)', '~12 min until restored (no estimate given)'),
        run: function () { addTime(12); mood(-20); S.e2.waited = true; evCheck('dcs-start', false); S.evRep.need++; if (S.cur) note('bad', function () { return tx(L('復旧の見込みがないまま受付を止め、列と締め切りを危険にさらしました。指示を受けて手作業に切り替えます。', '복구 예상이 없는 채 접수를 멈춰 줄과 마감을 위험하게 했습니다. 지시를 받아 수기로 전환합니다.', 'You stopped check-in with no restore time, putting the queue and the close at risk. Take instructions and switch to manual.')); }, 'passenger/1-1', 'dcs-wait'); if (mon) mon.style.filter = ''; } }],
      'passenger/1-1', function () { var t = document.querySelector('.term'); if (t) t.classList.toggle('manual', !!S.manual); if (S.cur) showTab(S.cur.tab); });
  }
  /* 수기 탑승권의 SEQ: 손으로 관리하는 일련번호 — 중복되면 탑승 인원 대조가 깨짐 */
  function pickSeq() {
    var c = S.cur, last = S.seq, opts = [last + 1, last, 1];
    modal(L('手書き搭乗券のSEQ', '수기 탑승권 SEQ', 'SEQ for the handwritten boarding pass'), tx(L('SEQの控え：最後に使った番号 ', 'SEQ 사본: 마지막으로 쓴 번호 ', 'SEQ log: last number used ')) + last,
      L('SEQ（チェックインの連番）は1人1つで重複させません。手作業では控えに書き込みながら、次の番号を使います。', 'SEQ(체크인 처리 순번)는 1인 1개로 중복시키지 않습니다. 수기에서는 사본에 적으면서 다음 번호를 씁니다.', 'Each passenger gets a unique SEQ (check-in sequence number). By hand, write it in the log and use the next number.'),
      opts.map(function (v) { return { t: L('SEQ ' + ('00' + v).slice(-3) + ' を使う', 'SEQ ' + ('00' + v).slice(-3) + ' 사용', 'Use SEQ ' + ('00' + v).slice(-3)), run: function () { c.seqPicked = true; c.seqNo = v; if (v <= last) c.flags.seqDup = true; } }; }),
      'passenger/1-1', function () { issueBP(); });
  }
  /* 복구: 수기 처리분을 시스템에 입력하고 좌석·SEQ·수하물을 대조, 게이트 최종 통보 */
  function runRecovery() {
    S.recovered = true; S.manual = false;
    var t = document.querySelector('.term'); if (t) t.classList.remove('manual');
    var mon = document.querySelector('#stage .monitor'); if (mon) mon.style.filter = '';
    var list = (S.manList || []).filter(function (r) { return r.bp; });
    S.e3 = { list: list, input: false, bags: false, gate: false, conflict: !S.e2.sync && list.length ? { r: list[0], fixed: false } : null };
    addTime(1); sfx.ok(); drawRecovery();
  }
  function drawRecovery() {
    var E = S.e3;
    var h = '<p>' + esc(tx(L('DCSが復旧しました。手作業で処理したお客様をシステムに入力し、座席・SEQ・手荷物タグを照合して、ゲートに最終の通知をします。', 'DCS가 복구되었습니다. 수기로 처리한 승객을 시스템에 입력하고 좌석·SEQ·수하물 태그를 대조한 뒤 게이트에 최종 통보합니다.', 'The DCS is back. Enter the manually processed passengers, reconcile seats, SEQ and bag tags, and give the gate the final word.'))) + '</p>';
    h += '<div class="chk">' + E.list.map(function (r) { return '<div class="mono small"><b>' + r.p.pp.sur + ' ' + r.p.pp.given + '</b> · SEAT ' + r.seat + ' · SEQ ' + ('00' + r.seqNo).slice(-3) + ' · ' + (r.bags.filter(function (b) { return b.tag; }).map(function (b) { return b.tag; }).join(', ') || '—') + '</div>'; }).join('') + '</div>';
    if (E.input && E.conflict) h += '<div class="why bad" style="margin-top:8px">' + (E.conflict.fixed ? '✓ ' : '') + esc(tx(L('照合の結果：', '대조 결과: ', 'Reconciliation: ')) + E.conflict.r.p.pp.sur + ' ' + tx(L('の座席 ', '의 좌석 ', ' — seat ')) + (E.conflict.was || E.conflict.r.seat) + tx(L(' は、障害中にオンライン側で別のお客様にも割り当てられていました。', '은 장애 중 온라인 쪽에서 다른 승객에게도 배정되어 있었습니다.', ' was also given to another passenger online during the outage.'))) + (E.conflict.fixed ? ' → ' + E.conflict.r.seat : '') + '</div>' + (E.conflict.fixed ? '' : '<div class="btns"><button class="btn pri" data-a="reseat">' + esc(tx(L('座席を変えて搭乗券を出し直し、お客様とゲートに連絡する', '좌석을 바꿔 탑승권을 다시 발행하고 승객과 게이트에 연락한다', 'Change the seat, reissue the boarding pass and tell the passenger and the gate'))) + '</button></div>');
    h += '<div class="btns">' +
      '<button class="btn" data-a="input" ' + (E.input ? 'disabled' : '') + '>' + (E.input ? '✓ ' : '') + esc(tx(L('システムに入力し、座席・SEQを照合する', '시스템에 입력하고 좌석·SEQ 대조', 'Enter them in the system and reconcile seats and SEQ'))) + '</button>' +
      '<button class="btn" data-a="bags" ' + (E.bags ? 'disabled' : '') + '>' + (E.bags ? '✓ ' : '') + esc(tx(L('手荷物タグと手荷物リストを照合する', '수하물 태그와 수하물 목록 대조', 'Reconcile the bag tags with the bag list'))) + '</button>' +
      '<button class="btn" data-a="gate" ' + (E.gate ? 'disabled' : '') + '>' + (E.gate ? '✓ ' : '') + esc(tx(L('ゲートに最終通知（手書き搭乗券のお客様）', '게이트에 최종 통보(수기 탑승권 승객)', 'Final notice to the gate (handwritten boarding passes)'))) + '</button>' +
      '<button class="btn pri" data-a="done">' + esc(tx(L('完了して次のお客様へ', '완료하고 다음 승객으로', 'Finish and call the next passenger'))) + '</button></div>';
    var card = openModalShell(L('DCS復旧 ― 手作業分の照合', 'DCS 복구 — 수기 처리분 대조', 'DCS restored — reconcile the manual work'), h);
    S.modalRedraw = drawRecovery;
    card.onclick = function (e) {
      var b = e.target.closest('[data-a]'); if (!b || b.disabled) return; var a = b.dataset.a;
      if (a === 'input') { E.input = true; addTime(2); sfx.tap(); return drawRecovery(); }
      if (a === 'bags') { E.bags = true; addTime(1.5); sfx.tap(); return drawRecovery(); }
      if (a === 'gate') { E.gate = true; addTime(1); sfx.tap(); return drawRecovery(); }
      if (a === 'reseat') { var r = E.conflict.r, ac = ACFT(); E.conflict.was = r.seat; var free = null; for (var row = 2; row <= ac.rows && !free; row++) { if (ac.exitRows.indexOf(row) >= 0) continue; for (var k = 0; k < 6; k++) { var id = row + ac.cols[k]; if (S.seats.indexOf(id) < 0) { free = id; break; } } } r.seatWas = r.seat; r.seat = free; S.seats.push(free); E.conflict.fixed = true; addTime(2); sfx.print(); return drawRecovery(); }
      if (a === 'done') return finishRecovery();
    };
  }
  function finishRecovery() {
    var E = S.e3, r0 = E.list[0] || S.results[S.results.length - 1];
    if (E.conflict && (!E.input || !E.conflict.fixed)) { safetyMiss(E.conflict.r, L('復旧後の照合をせず、同じ座席が2人に割り当てられたまま', '복구 후 대조를 하지 않아 같은 좌석이 2명에게 배정된 채', 'No reconciliation after the restore; one seat stayed assigned to two passengers'), 'seat-dup'); noteTo(E.conflict.r, 'bad', function () { return tx(L('手作業の座席がオンライン側と重なったままでした。復旧したら必ず照合し、重複を解消します。', '수기 좌석이 온라인 쪽과 겹친 채였습니다. 복구되면 반드시 대조해 중복을 해소합니다.', 'A manual seat still clashed with online. After a restore, always reconcile and clear duplicates.')); }, 'passenger/1-1', 'seat-dup'); }
    if (!E.input || !E.bags) { if (r0) { safetyMiss(r0, L('復旧後、手作業の旅客・手荷物を照合しなかった', '복구 후 수기 승객·수하물을 대조하지 않음', 'Did not reconcile the manual passengers and bags after the restore'), 'recon-skip'); noteTo(r0, 'bad', function () { return tx(L('手作業で受け付けた旅客と手荷物を、システム・手荷物リストと照合しませんでした（持ち主が搭乗しない手荷物を見落とす原因）。', '수기로 받은 승객과 수하물을 시스템·수하물 목록과 대조하지 않았습니다(주인이 탑승하지 않는 수하물을 놓치는 원인).', 'You did not reconcile the manual passengers and bags with the system and bag list (how unaccompanied bags slip through).')); }, 'passenger/1-1', 'recon-skip'); } }
    if (!E.gate && r0) noteTo(r0, 'bad', function () { return tx(L('手書き搭乗券のお客様について、ゲートに最終通知をしていません。', '수기 탑승권 승객에 대해 게이트에 최종 통보를 하지 않았습니다.', 'You did not give the gate the final notice about the handwritten boarding passes.')); }, 'passenger/1-1', 'gate-notify');
    if (E.input && E.bags && E.gate && (!E.conflict || E.conflict.fixed) && r0) noteTo(r0, 'good', function () { return tx(L('復旧後に手作業分を入力・照合し、ゲートに最終通知しました。', '복구 후 수기 처리분을 입력·대조하고 게이트에 최종 통보했습니다.', 'After the restore you entered and reconciled the manual work and told the gate.')); }, 'passenger/1-1');
    evCheck('recon-input', E.input && (!E.conflict || E.conflict.fixed)); evCheck('recon-bags', E.bags); evCheck('recon-gate', E.gate);
    closeModal(); nextPax();
  }

  /* ================= Day 5 : 지연(E5-01)·항의(E5-03)·예약 초과(E5-02) ================= */
  /* 지연 후 연결 시간(분) = 연결편 출발 − 지연 후 도착 예정. 일본·한국은 시차 없음 */
  function connLeft(p) { return pm(p.conn.dep) - pm(V.eta); }
  function brdOf(c) { return c && c.vol ? V.alt.board : S && S.delay ? V.boardNew : V.board; }
  /* 승객이 아닌 운항 이벤트(지연 시작·예약 초과)의 기록: 결과의 「운항 이벤트」 칸 */
  function evRec() { return S.evRec || (S.evRec = { p: { id: 'event', pp: { sur: '', given: '' } }, ev: true, notes: [], acts: {}, selfFix: [], mood: 0, mins: 0 }); }
  function evNote(type, fn, lesson, code) { evRec().notes.push({ t: type, x: fn, l: lesson, c: code }); }
  function setDelay(vague) { S.delay = { etd: V.etd }; S.delayVague = !!vague; if ($('#gbar')) { $('#gbar').innerHTML = barInner(); bindBar(); updateBar(); } }
  /* E5-01 시작: SV 전화 — 확인된 사실을 받고 표시를 갱신한 뒤 안내 */
  function runDelay() {
    sfx.ng(); STG.pose('explain');
    modal(L('SVから電話：出発が遅れる見込みです', 'SV의 전화: 출발이 지연될 예정입니다', 'Call from the SV: the departure will be late'), V.flight + ' STD ' + V.std + ' · ' + tx(L('到着する機材が遅れています', '도착 기재가 늦어지고 있습니다', 'The inbound aircraft is late')),
      L('遅延のご案内は、SVから確認できた事実（新しい出発予定・理由・搭乗開始・締め切り）を受け、表示を更新してから行います。推測で案内したり、確認していないことを約束したりしません。Vela Air 教育用規定：120分以上の遅延は食事券。乗り継ぎのあるお客様は接続を計算し直します。', '지연 안내는 SV에게서 확인된 사실(새 출발 예정·이유·탑승 시작·마감)을 받고 표시를 갱신한 뒤에 합니다. 추측으로 안내하거나 확인하지 않은 것을 약속하지 않습니다. Vela Air 교육용 규정: 120분 이상 지연은 식사 쿠폰. 연결편 승객은 연결을 다시 계산합니다.', 'Announce a delay only with facts confirmed by the SV (new departure, reason, boarding, close), after updating the displays. Do not guess or promise what is unconfirmed. Vela Air training rule: a meal voucher for delays of 120 minutes or more. Recalculate connections.'),
      [{ t: L('SVに新しい出発予定・理由・搭乗開始・締め切りと食事券の扱いを確認し、カウンターの表示を更新してから受付を続ける', 'SV에게 새 출발 예정·이유·탑승 시작·마감과 식사 쿠폰 처리를 확인하고 카운터 표시를 갱신한 뒤 접수를 계속한다', 'Confirm the new departure, reason, boarding, close and voucher handling with the SV, update the counter display, then carry on'), s: L('約1.5分', '약 1.5분', '~1.5 min'),
        run: function () { addTime(1.5); setDelay(false); evCheck('delay-start', true); S.evRep.need++; S.evRep.done++; evNote('good', function () { return tx(L('遅延の事実をSVに確認し、表示を更新してから受付を続けました（ETD ' + V.etd + '・搭乗開始 ' + V.boardNew + '・締め切りは当初どおり ' + V.close + '）。', '지연 사실을 SV에게 확인하고 표시를 갱신한 뒤 접수를 계속했습니다(ETD ' + V.etd + '·탑승 시작 ' + V.boardNew + '·마감은 원래대로 ' + V.close + ').', 'You confirmed the delay with the SV and updated the display before carrying on (ETD ' + V.etd + ', boarding ' + V.boardNew + ', close unchanged at ' + V.close + ').')); }, 'passenger/5-4'); } },
       { t: L('詳しく確認せず、お客様には「少し遅れるようです」とだけ伝えて続ける', '자세히 확인하지 않고 승객에게는 「조금 늦어지는 것 같습니다」라고만 전하고 계속한다', 'Carry on without checking and just tell passengers it "seems a bit late"'),
        run: function () { addTime(.3); setDelay(true); evCheck('delay-start', false); S.evRep.need++; evNote('bad', function () { return tx(L('遅延の内容をSVに確認せずに受付を続けました。新しい出発予定・搭乗開始が分からないままでは、正しい案内も乗り継ぎの計算もできません。', '지연 내용을 SV에게 확인하지 않고 접수를 계속했습니다. 새 출발 예정·탑승 시작을 모르면 올바른 안내도 연결 계산도 할 수 없습니다.', 'You carried on without confirming the delay with the SV. Without the new departure and boarding times you cannot inform passengers or recalculate connections.')); }, 'passenger/5-4', 'delay-vague'); } },
       { t: L('新しい時刻が正式に決まるまで、受付を止めて待つ', '새 시각이 정식으로 정해질 때까지 접수를 멈추고 기다린다', 'Stop check-in until the new time is final'), s: L('約10分', '약 10분', '~10 min'),
        run: function () { addTime(10); S.bgQueue += 4; setDelay(false); evCheck('delay-start', false); S.evRep.need++; evNote('bad', function () { return tx(L('遅延の見込みが出た時点で受付を止め、列と締め切りを危険にさらしました。SVに分かっている事実を確認し、受付は続けます。', '지연 예상이 나온 시점에 접수를 멈춰 줄과 마감을 위험하게 했습니다. SV에게 알려진 사실을 확인하고 접수는 계속합니다.', 'You stopped check-in as soon as a delay was expected, putting the queue and the close at risk. Confirm the known facts with the SV and keep checking in.')); }, 'passenger/5-4', 'delay-stop'); } }],
      'passenger/5-4', function () { nextPax(); });
  }
  /* 승객이 카운터에 왔을 때: 예약 초과 자원자(대체편) / 항의 승객의 처음 기분 */
  function d5Arrive(c) {
    var p = c.p;
    if (S.ob && S.ob.vol === p.id) { c.vol = { consent: !!S.ob.consent }; c.seat = V.alt.seat; c.seatGood = true; c.delayTold = !!S.ob.consent; p.say.hello = S.ob.consent ? p.say.volHello : p.say.volUpset; if (!S.ob.consent) c.mood = Math.min(c.mood, 40); }
    if (p.complain) c.mood = Math.min(c.mood, 38);
  }
  function delayBanner(c) {
    var btn = c.delayTold ? '<span class="pill ok">' + esc(tx(c.vol ? L('ご説明済み', '설명 완료', 'Explained') : L('案内・食事券 済', '안내·식사 쿠폰 완료', 'Told · voucher given'))) + '</span>' : '<button class="btn" id="dlb">' + esc(tx(c.vol ? L('便の変更と協力の条件をご説明する', '편 변경과 협력 조건을 설명하기', 'Explain the flight change and the terms') : L('遅延をご案内し、食事券をお渡しする', '지연을 안내하고 식사 쿠폰을 드리기', 'Explain the delay and give the meal voucher'))) + '</button>';
    if (c.vol) return '<div class="dlbanner"><span>' + esc(tx(L('協力者：', '협력자: ', 'Volunteer: '))) + '<b class="mono">' + V.alt.flight + ' ' + V.alt.dep + '</b> ' + esc(tx(c.vol.consent ? L('に変更（ご本人の同意済み）', '로 변경(본인 동의 완료)', '— rebooked with consent') : L('に変更（ご本人の同意を得ていない）', '로 변경(본인 동의를 받지 않음)', '— rebooked without consent'))) + '</span>' + btn + '</div>';
    return '<div class="dlbanner"><span>' + esc(tx(L('遅延', '지연', 'Delay'))) + ' <b class="mono">' + V.flight + ' ETD ' + V.etd + '</b> (+' + M.delayMin + tx(T.min) + ')' + (S.delayVague ? '' : ' · ' + esc(tx(L('到着機材の遅れ（当社の都合）', '도착 기재 지연(당사 사정)', 'late inbound aircraft (airline cause)'))) + ' · ' + esc(tx(L('搭乗開始 ', '탑승 시작 ', 'Boarding '))) + V.boardNew + ' · ' + esc(tx(L('締め切りは当初どおり ', '마감은 원래대로 ', 'Check-in still closes at '))) + V.close) + '</span>' + btn + '</div>';
  }
  function tellDelay() {
    var c = S.cur; if (!c || c.delayTold || S.leaving) return;
    c.delayTold = true; addTime(.4); sfx.tap();
    say('me', c.vol ? L('お待たせしました。' + V.alt.flight + '（' + V.alt.dep + '発）へのご変更について、お礼の内容とあわせてご説明いたします。', '기다려 주셔서 감사합니다. ' + V.alt.flight + '(' + V.alt.dep + ' 출발)로의 변경에 대해 협력 보상 조건과 함께 설명드리겠습니다.', 'Thank you for waiting. Let me explain the change to ' + V.alt.flight + ' (' + V.alt.dep + ') and what we offer.') :
      L('出発が遅れる見込みです。ご迷惑をおかけし、申し訳ございません。新しい出発予定は' + V.etd + '、搭乗開始は' + V.boardNew + 'です。お食事券をお渡しします。', '출발이 지연될 예정입니다. 불편을 드려 죄송합니다. 새 출발 예정은 ' + V.etd + ', 탑승 시작은 ' + V.boardNew + '입니다. 식사 쿠폰을 드리겠습니다.', 'Departure is expected to be delayed. I am sorry for the inconvenience. The new departure is ' + V.etd + ' and boarding starts at ' + V.boardNew + '. Here is a meal voucher.'));
    var me = c; setTimeout(function () { if (S.cur === me && G.screen === 'play') say('pax', me.p.say.delay); }, 700);
    showTab(c.tab);
  }
  /* 연결 재확인 칸(입국 조건 탭): 도착 예정이 바뀐 만큼 연결 시간이 줄어듦 — 계산은 플레이어가 함 */
  function connPanel(c, p) {
    var v = c.chk.conn, o = p.conn0 || p.conn;
    var h = '<div class="chk conn5"><div class="small"><b>' + esc(tx(L('遅延後の乗り継ぎ再確認', '지연 후 연결 재확인', 'Recheck the connection after the delay'))) + '</b> · ' + esc(tx(L('日本と韓国は時差なし（JST＝KST）', '일본과 한국은 시차 없음(JST＝KST)', 'No time difference between Japan and Korea (JST = KST)'))) + '</div>' +
      '<table class="cx mono"><tr><td>' + esc(tx(L('到着予定', '도착 예정', 'Arrival'))) + ' ' + V.to + '</td><td><s>' + V.sta + '</s> → <b>' + V.eta + '</b></td></tr>' +
      '<tr><td>' + esc(tx(L('乗り継ぎ便', '연결편', 'Connection'))) + '</td><td>' + o.flight + ' ' + o.dep + ' · ' + esc(tx(L('元の乗り継ぎ時間 ', '원래 연결 시간 ', 'planned connection '))) + Math.floor(o.cnx / 60) + 'h' + ('0' + o.cnx % 60).slice(-2) + '</td></tr>' +
      (c.flags.connRebooked ? '<tr><td>' + esc(tx(L('変更後', '변경 후', 'Rebooked'))) + '</td><td><b>' + p.conn.flight + ' ' + p.conn.dep + '</b> <span class="pill ok">' + esc(tx(L('ご本人の同意済み', '본인 동의 완료', 'with consent'))) + '</span></td></tr>' : '') +
      '<tr><td>MCT</td><td>' + o.mct + tx(T.min) + ' <span class="small">(' + esc(tx(L('Vela 教育用・この空港のこの乗り継ぎ', 'Vela 교육용·이 공항의 이 연결', 'Vela training value for this transfer'))) + ')</span></td></tr></table>';
    h += '<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-top:6px"><span style="flex:1;min-width:140px">' + esc(tx(L('遅延後も元の乗り継ぎ便に間に合う（MCT以上）', '지연 후에도 원래 연결편 탑승 가능(MCT 이상)', 'Still makes the original connection after the delay (MCT or more)'))) + '</span>' +
      (v ? '<span class="pill ' + (v === 'ok' ? 'ok' : 'ng') + '">' + esc(tx(v === 'ok' ? L('間に合う', '연결편 탑승 가능', 'Makes it') : L('間に合わない', '연결편 탑승 불가', 'Misses it'))) + '</span>' + (c.flags.connRebooked ? '' : reBtn('conn')) :
        '<button class="btn" style="padding:6px 10px" data-ck="conn" data-v="ok">' + esc(tx(L('間に合う', '연결편 탑승 가능', 'Makes it'))) + '</button><button class="btn warnb" style="padding:6px 10px" data-ck="conn" data-v="ng">' + esc(tx(L('間に合わない', '연결편 탑승 불가', 'Misses it'))) + '</button>') + '</div></div>';
    return h;
  }
  function decideConn() {
    var c = S.cur, p = c.p, alt = p.alt, left = connLeft(p);
    modal(L('遅延で乗り継ぎ便に間に合いません', '지연으로 연결편에 맞출 수 없습니다', 'The delay breaks the connection'), V.to + ' ETA ' + V.eta + ' → ' + p.conn.flight + ' ' + p.conn.dep + ' = ' + left + tx(T.min) + ' < MCT ' + p.conn.mct + tx(T.min),
      L('乗り継ぎ時間がMCTを下回ると、元の便には乗り継げません。事実を説明し、別の便を調べて、ご本人の同意を得てから予約を変更します。搭乗券と手荷物タグは新しい便で出し直します。宿泊は、当社の都合で乗り継げず実際に宿泊が必要になり、承認された場合だけです（Vela 教育用規定）。', '연결 시간이 MCT보다 짧으면 원래 편으로는 갈아탈 수 없습니다. 사실을 설명하고 다른 편을 찾아 본인 동의를 받은 뒤 예약을 변경합니다. 탑승권과 수하물 태그는 새 편으로 다시 발행합니다. 숙박은 당사 사정으로 연결하지 못해 실제로 숙박이 필요하고 승인된 경우에만입니다(Vela 교육용 규정).', 'Below the MCT the original connection cannot be made. Explain the facts, find another flight and rebook only with the passenger\'s consent. Reissue the boarding pass and bag tags for the new flight. A hotel only applies when an airline-caused misconnection really needs an overnight stay and it is approved (Vela training rule).'),
      [{ t: L('事情を説明し、同じ日の後続便（' + alt.flight + '・' + alt.dep + '発）を案内。同意を得て予約を変更し、2枚目の搭乗券と手荷物タグを新しい便で発行する', '사정을 설명하고 같은 날 후속편(' + alt.flight + '·' + alt.dep + ' 출발)을 안내. 동의를 받아 예약을 변경하고 2장째 탑승권과 수하물 태그를 새 편으로 발행한다', 'Explain, offer the later flight the same day (' + alt.flight + ', ' + alt.dep + '), rebook with consent and issue the second boarding pass and bag tags for it'), s: L('約3分', '약 3분', '~3 min'),
        run: function () {
          addTime(3); mood(+6); p.conn0 = p.conn; p.conn = { flight: alt.flight, from: alt.from, to: alt.to, dep: alt.dep, arr: alt.arr, mct: p.conn0.mct, cnx: pm(alt.dep) - pm(V.sta), esta: p.conn0.esta };
          c.flags.connRebooked = true; c.chk.conn = 'ng'; c.flags.connKeep = false; c.flags.missed_conn = false; fixDone(c, 'conn-miss'); act(c, 'conn-miss', 'rebooked-with-consent');
          var re = 0; c.bags.forEach(function (b) { if (b.tag) { b.oldTag = b.tag; b.tag = null; re++; } }); c.flags.retag = re;
          say('pax', p.say.rebookOk);
          note('good', function () { return tx(L('遅延後の乗り継ぎ時間がMCTに足りないことに気づき、同意を得て後続便に変更しました' + (re ? '（付けたタグは無効にして付け直し）' : '') + '。', '지연 후 연결 시간이 MCT에 모자란 것을 알아차리고 동의를 받아 후속편으로 변경했습니다' + (re ? '(단 태그는 무효로 하고 다시 발행)' : '') + '.', 'You spotted that the delayed connection fell short of the MCT and rebooked onto the later flight with consent' + (re ? ' (old tags voided and reissued)' : '') + '.')); }, 'passenger/1-4');
        } },
       { t: L('間に合うかもしれないので、元の乗り継ぎ便のまま最終目的地まで通しで手続きする', '맞출 수도 있으니 원래 연결편 그대로 최종 목적지까지 통으로 수속한다', 'It might still work — check through on the original connection'),
        run: function () { c.chk.conn = 'ng'; c.flags.connKeep = true; c.flags.missed_conn = true; act(c, 'conn-miss', c.fixTry['conn-miss'] ? 'kept-original-connection-again' : 'kept-original-connection'); } },
       { t: L('乗り継ぎ地のホテルを手配すると約束して安心してもらう', '환승지 호텔을 잡아 주겠다고 약속해 안심시킨다', 'Reassure the passenger by promising a hotel at the transfer point'),
        run: function () { mood(+4); if (!c.flags.hotelNoted) { c.flags.hotelNoted = true; note('bad', function () { return tx(L('同じ日の後続便があり、宿泊の必要も承認もないのに、ホテルを約束しました。補償や宿泊は規定と承認の範囲でしか約束しません。', '같은 날 후속편이 있어 숙박이 필요하지도 승인되지도 않았는데 호텔을 약속했습니다. 보상이나 숙박은 규정과 승인 범위에서만 약속합니다.', 'There was a later flight the same day, no need for an overnight stay and no approval, yet you promised a hotel. Promise compensation or hotels only within the rules and approvals.')); }, 'passenger/5-6', 'promise-hotel'); } } }],
      'passenger/1-4', function () { if (!c.flags.connRebooked && !c.flags.connKeep) return setTimeout(decideConn, 200); tabEntry(); renderTabs(); });
  }
  /* E5-03 항의: 1) 사과·확인된 사실·다음 행동 2) 보상 요구 — 규정 범위 안내, 권한 밖은 SV */
  function runComplaint() {
    var c = S.cur, p = c.p; if (!c || c.flags.cmpDone) return;
    c.flags.cmpDone = true;
    modal(L('お客様が遅延に強い不満を示しています', '승객이 지연에 강한 불만을 나타내고 있습니다', 'The passenger is very unhappy about the delay'), 'ETD ' + V.etd + ' (+' + M.delayMin + tx(T.min) + ') · ' + p.conn.flight + ' ' + p.conn.dep,
      L('まずお詫びし、確認できている事実だけを伝えます。確認していないことは約束せず、言い争いません。次に何をするか（乗り継ぎの確認）を伝えます。', '먼저 사과하고 확인된 사실만 전합니다. 확인하지 않은 것은 약속하지 않고 언쟁하지 않습니다. 다음에 무엇을 할지(연결 확인)를 전합니다.', 'Apologise first and share only confirmed facts. Do not promise what you have not confirmed, and do not argue. Say what you will do next (check the connection).'),
      [{ t: L('ご迷惑をおかけしていることをお詫びし、確認できている事実（新しい出発予定と理由）を伝えて、乗り継ぎをすぐ確認すると伝える', '불편을 드린 것을 사과하고 확인된 사실(새 출발 예정과 이유)을 전한 뒤 연결을 바로 확인하겠다고 전한다', 'Apologise, give the confirmed facts (new departure and reason) and say you will check the connection right away'),
        run: function () { addTime(.8); mood(+14); evCheck('cmp-apology', true); say('me', L('ご迷惑をおかけし、申し訳ございません。到着する機材の遅れで、出発は' + V.etd + 'の予定です。お乗り継ぎをすぐに確認いたします。', '불편을 드려 죄송합니다. 도착 기재 지연으로 출발은 ' + V.etd + ' 예정입니다. 연결편을 바로 확인하겠습니다.', 'I am very sorry for the trouble. The inbound aircraft is late, so departure is now planned for ' + V.etd + '. I will check your connection right away.')); } },
       { t: L('「大丈夫です、必ず乗り継げます」と言って安心してもらう', '「괜찮습니다, 반드시 갈아타실 수 있습니다」라고 안심시킨다', 'Say "Don\'t worry, you will definitely make it"'),
        run: function () { addTime(.3); mood(+6); evCheck('cmp-apology', false); note('bad', function () { return tx(L('確認していないのに「必ず乗り継げます」と約束しました。乗り継ぎは遅延後の到着予定で計算してから案内します。', '확인하지 않았는데 「반드시 갈아타실 수 있다」고 약속했습니다. 연결은 지연 후 도착 예정으로 계산한 뒤 안내합니다.', 'You promised the connection without checking. Work it out from the delayed arrival before saying anything.')); }, 'passenger/5-6', 'promise'); } },
       { t: L('「遅延はどうしようもないことです」と説明して、納得してもらう', '「지연은 어쩔 수 없는 일입니다」라고 설명해 납득시킨다', 'Explain that "delays just happen" and get them to accept it'),
        run: function () { addTime(1); mood(-18); evCheck('cmp-apology', false); note('bad', function () { return tx(L('お詫びをせず、相手を説得しようとして言い争いになりかけました。まずお詫びし、事実と次の行動を伝えます。', '사과하지 않고 상대를 설득하려다 언쟁이 될 뻔했습니다. 먼저 사과하고 사실과 다음 행동을 전합니다.', 'You tried to talk the passenger round instead of apologising, and it nearly became an argument. Apologise, then give facts and next steps.')); }, 'passenger/5-6', 'argue'); } }],
      'passenger/5-6', function () { var me = c; say('pax', p.say.comp); setTimeout(function () { if (S.cur === me && G.screen === 'play') runComp2(); }, 900); });
  }
  function runComp2() {
    var c = S.cur, p = c.p;
    modal(L('補償を求められました', '보상을 요구받았습니다', 'The passenger asks for compensation'), tx(L('遅延 ', '지연 ', 'Delay ')) + M.delayMin + tx(T.min) + ' · Vela: ' + tx(L('120分以上で食事券', '120분 이상 식사 쿠폰', 'meal voucher from 120 min')),
      L('Vela Air 教育用規定：120分以上の遅延は食事券。宿泊は、当社の都合で乗り継げず宿泊が実際に必要で、承認された場合だけ。それ以外の補償はカウンターで約束せず、責任者（SV）につなぎます。', 'Vela Air 교육용 규정: 120분 이상 지연은 식사 쿠폰. 숙박은 당사 사정으로 연결하지 못해 숙박이 실제로 필요하고 승인된 경우에만. 그 밖의 보상은 카운터에서 약속하지 않고 책임자(SV)에게 연결합니다.', 'Vela Air training rule: a meal voucher for delays of 120 minutes or more. A hotel only when an airline-caused misconnection really needs one and it is approved. Anything else is not promised at the counter — pass it to the SV.'),
      [{ t: L('規定の食事券をお渡しし、それ以上のご要望は自分では約束できないため、責任者（SV）につなぐと伝える', '규정 식사 쿠폰을 드리고, 그 이상의 요청은 제가 약속할 수 없으니 책임자(SV)에게 연결하겠다고 전한다', 'Give the meal voucher and say you will pass anything more to the SV, as you cannot promise it yourself'), s: L('約1.5分', '약 1.5분', '~1.5 min'),
        run: function () { addTime(1.5); mood(+6); c.delayTold = true; evCheck('cmp-comp', true); S.evRep.need++; S.evRep.done++; say('pax', p.say.calmed); note('good', function () { return tx(L('お詫び・事実・規定の食事券を案内し、それ以上の要望は責任者につなぎました。', '사과·사실·규정 식사 쿠폰을 안내하고 그 이상의 요청은 책임자에게 연결했습니다.', 'You apologised, gave the facts and the voucher, and passed further requests to the supervisor.')); }, 'passenger/5-6'); } },
       { t: L('お詫びとして、その場で現金の補償を約束する', '사과의 뜻으로 그 자리에서 현금 보상을 약속한다', 'Promise a cash payment on the spot as an apology'),
        run: function () { addTime(.5); mood(+10); evCheck('cmp-comp', false); S.evRep.need++; note('bad', function () { return tx(L('権限のない現金補償をその場で約束しました。規定にない補償はSVが判断します。', '권한 없는 현금 보상을 그 자리에서 약속했습니다. 규정에 없는 보상은 SV가 판단합니다.', 'You promised a cash payment you had no authority for. Compensation outside the rules is the SV\'s decision.')); }, 'passenger/5-6', 'promise-comp'); } },
       { t: L('「補償は一切ありません」とお断りする', '「보상은 일절 없습니다」라고 거절한다', 'Say "There is no compensation at all"'),
        run: function () { addTime(.5); mood(-16); evCheck('cmp-comp', false); S.evRep.need++; note('bad', function () { return tx(L('120分以上の遅延なので、規定の食事券の対象でした。お客様が受けられるものを案内せずに断りました。', '120분 이상 지연이라 규정 식사 쿠폰 대상이었습니다. 승객이 받을 수 있는 것을 안내하지 않고 거절했습니다.', 'A 120-minute delay qualifies for the meal voucher. You refused without telling the passenger what they were entitled to.')); }, 'passenger/5-6', 'comp-deny'); } }],
      'passenger/5-6', function () { showTab(c.tab); });
  }
  /* ================= 27차(사용자 10-14): 클레임 — 먼저 사과, 확인된 사실, 할 수 있는 것과 다음 행동. 확인하지 않은 약속·권한 없는 보상·언쟁은 감점 ================= */
  var CLAIMS = {
    dcsWait: { title: L('お客様が待ち時間と手書きの搭乗券に不満を示しています', '승객이 대기 시간과 수기 탑승권에 불만을 나타내고 있습니다', 'The passenger is unhappy about the wait and the handwritten boarding pass'),
      fact: function () { return tx(L('DCS障害・手作業チェックイン中 · 復旧見込み未定', 'DCS 장애·수기 체크인 중 · 복구 예정 미정', 'DCS down · manual check-in · no restore time yet')); },
      must: L('まずお詫びし、確認できている事実（システム障害で手作業で手続き中）を伝えます。手書きの搭乗券も正式なもので、搭乗口に連絡されることを伝えて安心していただきます。復旧の時刻など、確認していないことは約束しません。', '먼저 사과하고 확인된 사실(시스템 장애로 수기 수속 중)을 전합니다. 수기 탑승권도 정식이고 탑승구에 통보된다는 것을 알려 안심시킵니다. 복구 시각 등 확인하지 않은 것은 약속하지 않습니다.', 'Apologise first and share the confirmed facts (the system is down and check-in is by hand). Reassure them that a handwritten boarding pass is valid and the gate is informed. Do not promise anything unconfirmed, such as a restore time.'),
      evId: 'claim-dcs', lesson: 'passenger/1-1',
      ok: L('お待たせしたことをお詫びし、システム障害で手作業で手続きしていること、手書きの搭乗券も正式で搭乗口に連絡が入ることを伝える', '기다리게 한 것을 사과하고, 시스템 장애로 수기 수속 중이며 수기 탑승권도 정식이고 탑승구에 연락이 간다고 전한다', 'Apologise for the wait, explain the system outage and manual check-in, and that a handwritten boarding pass is valid and the gate is informed'),
      okSay: L('お待たせして申し訳ございません。ただいまシステムの障害で、手作業で手続きをしております。手書きの搭乗券も正式なもので、搭乗口にも連絡が入りますので、ご安心ください。', '오래 기다리시게 해서 죄송합니다. 지금 시스템 장애로 수기로 수속하고 있습니다. 손으로 쓴 탑승권도 정식 탑승권이고 탑승구에도 연락이 가니 안심하세요.', 'I am sorry to have kept you waiting. The system is down, so we are checking in by hand. A handwritten boarding pass is a proper boarding pass, and the gate is informed, so please do not worry.'),
      okNote: L('お詫び・事実・手書き搭乗券の有効性を伝え、確認していない復旧時刻は約束しませんでした。', '사과·사실·수기 탑승권의 유효성을 전하고, 확인하지 않은 복구 시각은 약속하지 않았습니다.', 'You apologised, gave the facts and explained the handwritten pass is valid, without promising an unconfirmed restore time.'),
      bad: [{ t: L('「あと5分ほどでシステムは直ります」と伝えて安心してもらう', '「5분 정도면 시스템이 고쳐집니다」라고 안심시킨다', 'Reassure them that "the system will be back in about five minutes"'), code: 'promise-time', m: 4,
              n: L('復旧の見込みが出ていないのに、時刻を約束しました。確認できていないことは約束せず、分かっている事実を伝えます。', '복구 예정이 나오지 않았는데 시각을 약속했습니다. 확인되지 않은 것은 약속하지 않고 알고 있는 사실을 전합니다.', 'You promised a restore time that nobody had given. Do not promise what is unconfirmed; share what you know.') },
            { t: L('「システムの問題なので、私たちにもどうしようもありません」と説明する', '「시스템 문제라 저희도 어쩔 수 없습니다」라고 설명한다', 'Explain that "it is a system problem, there is nothing we can do"'), code: 'argue', m: -14,
              n: L('お詫びをせず、システムのせいにしました。まずお詫びし、手作業でも手続きできることと搭乗券が有効なことを伝えます。', '사과하지 않고 시스템 탓을 했습니다. 먼저 사과하고 수기로도 수속할 수 있고 탑승권이 유효하다는 것을 전합니다.', 'You blamed the system instead of apologising. Apologise, then explain check-in continues by hand and the pass is valid.') }] },
    seatChanged: { title: L('事前に選んだ座席が変わったことに不満を示しています', '미리 고른 좌석이 바뀐 것에 불만을 나타내고 있습니다', 'The passenger is unhappy that the seat they chose has changed'),
      fact: function () { return tx(L('機材変更（A配置→B配置）· オンラインで指定した窓側席が自動で変更', '기재 변경(A 배치→B 배치) · 온라인으로 지정한 창가석이 자동 변경', 'Aircraft change (layout A → B) · the window seat chosen online was moved automatically')); },
      must: L('まずお詫びし、機材変更で座席の配置が変わった事実を伝えます。いま空いている席の中から、ご希望（窓側）にできるだけ近い席を探します。権限のないアップグレードや補償は約束せず、「変えられない」と突き放しもしません。', '먼저 사과하고 기재 변경으로 좌석 배치가 바뀐 사실을 전합니다. 지금 비어 있는 자리 중에서 희망(창가)에 최대한 가까운 자리를 찾습니다. 권한 없는 업그레이드·보상은 약속하지 않고, 「바꿀 수 없다」고 잘라 말하지도 않습니다.', 'Apologise first and explain the aircraft change altered the seat layout. Look for the free seat closest to the request (window). Do not promise upgrades or compensation you cannot give, and do not just say it cannot be changed.'),
      evId: 'claim-seat', lesson: 'passenger/1-5',
      ok: L('ご不便をお詫びし、機材変更で配置が変わったことを説明して、空いている窓側の席を探すと伝える', '불편을 사과하고 기재 변경으로 배치가 바뀐 것을 설명한 뒤, 비어 있는 창가 자리를 찾아 드리겠다고 전한다', 'Apologise, explain the aircraft change altered the layout, and offer to find a free window seat'),
      okSay: L('ご不便をおかけして申し訳ございません。機材が変わり、座席の配置が変わったため、お席が変更になりました。いま空いている窓側のお席をお探しします。', '불편을 드려 죄송합니다. 기재가 바뀌어 좌석 배치가 달라지는 바람에 좌석이 변경되었습니다. 지금 비어 있는 창가 자리를 찾아 드리겠습니다.', 'I am sorry for the inconvenience. The aircraft was changed and the seat layout is different, so your seat moved. Let me find you a free window seat.'),
      okNote: L('お詫びと機材変更の事実を伝え、空いている窓側の席を探すと案内しました。', '사과와 기재 변경 사실을 전하고 비어 있는 창가 자리를 찾겠다고 안내했습니다.', 'You apologised, explained the aircraft change and offered to find a free window seat.'),
      bad: [{ t: L('お詫びとして、無料で上のクラスにアップグレードすると約束する', '사과의 뜻으로 무료로 상위 클래스로 업그레이드해 주겠다고 약속한다', 'Promise a free upgrade to a higher class as an apology'), code: 'promise-comp', m: 8,
              n: L('権限のない無料アップグレードを約束しました。補償やアップグレードは規定とSVの判断によります。まず空いている希望に近い席を探します。', '권한 없는 무료 업그레이드를 약속했습니다. 보상·업그레이드는 규정과 SV 판단에 따릅니다. 먼저 비어 있는 희망에 가까운 자리를 찾습니다.', 'You promised a free upgrade you had no authority for. Compensation and upgrades follow the rules and the SV\'s decision; first look for a free seat close to the request.') },
            { t: L('「システムが自動で決めたので変えられません」と伝える', '「시스템이 자동으로 정해서 바꿀 수 없습니다」라고 전한다', 'Say "the system set it automatically, so it cannot be changed"'), code: 'argue', m: -16,
              n: L('事実と違う説明で突き放しました。自動の割り当ては変更できます。お詫びして、空いている窓側の席を探します。', '사실과 다른 설명으로 잘라 말했습니다. 자동 배정은 바꿀 수 있습니다. 사과하고 비어 있는 창가 자리를 찾습니다.', 'You brushed them off with something untrue: automatic assignments can be changed. Apologise and look for a free window seat.') }] },
    lounge: { title: L('遅延を理由にラウンジの利用を求められました', '지연을 이유로 라운지 이용을 요구받았습니다', 'The passenger asks for lounge access because of the delay'),
      fact: function () { return 'ETD ' + V.etd + ' (+' + M.delayMin + tx(T.min) + ') · Vela: ' + tx(L('120分以上で食事券', '120분 이상 식사 쿠폰', 'meal voucher from 120 min')); },
      must: L('まずお詫びします。規定にない補償（ラウンジなど）はカウンターで約束しません。受けられるもの（120分以上の遅延の食事券）を案内し、それ以上のご要望は責任者（SV）につなぎます。', '먼저 사과합니다. 규정에 없는 보상(라운지 등)은 카운터에서 약속하지 않습니다. 받을 수 있는 것(120분 이상 지연의 식사 쿠폰)을 안내하고, 그 이상의 요청은 책임자(SV)에게 연결합니다.', 'Apologise first. Do not promise compensation outside the rules (such as the lounge) at the counter. Offer what applies (a meal voucher for 120+ minutes) and pass further requests to the SV.'),
      evId: 'claim-lounge', lesson: 'passenger/5-6',
      ok: L('お詫びし、ラウンジは案内できないが規定の食事券をお渡しすること、それ以上のご要望は責任者につなぐことを伝える', '사과하고, 라운지는 안내할 수 없지만 규정 식사 쿠폰을 드리며 그 이상의 요청은 책임자에게 연결하겠다고 전한다', 'Apologise, explain the lounge is not available but give the meal voucher, and pass further requests to the SV'),
      okSay: L('お待たせして申し訳ございません。ラウンジはご案内できませんが、規定によりお食事券をお渡しします。ほかにご要望があれば、責任者におつなぎします。', '기다리시게 해서 죄송합니다. 라운지는 안내해 드릴 수 없지만 규정에 따라 식사 쿠폰을 드리겠습니다. 다른 요청이 있으시면 책임자에게 연결해 드리겠습니다.', 'I am sorry for the wait. I cannot offer the lounge, but under our rules I will give you a meal voucher. If there is anything else, I will connect you to my supervisor.'),
      okNote: L('お詫びし、規定の食事券を案内して、規定にないラウンジは約束せず責任者につなぎました。', '사과하고 규정 식사 쿠폰을 안내했으며, 규정에 없는 라운지는 약속하지 않고 책임자에게 연결했습니다.', 'You apologised, gave the meal voucher and did not promise the lounge, passing further requests to the SV.'),
      after: function (c) { c.delayTold = true; },
      bad: [{ t: L('ラウンジを使えるように手配すると約束する', '라운지를 쓸 수 있게 해 드리겠다고 약속한다', 'Promise to arrange lounge access'), code: 'promise-comp', m: 10,
              n: L('規定にないラウンジの利用を約束しました。規定外の補償はSVが判断します。', '규정에 없는 라운지 이용을 약속했습니다. 규정 밖의 보상은 SV가 판단합니다.', 'You promised lounge access outside the rules. Compensation beyond the rules is the SV\'s decision.') },
            { t: L('「遅延は当社のせいではありません」と説明する', '「지연은 당사 탓이 아닙니다」라고 설명한다', 'Explain that "the delay is not our fault"'), code: 'argue', m: -16,
              n: L('事実と違う説明で言い争いになりかけました。到着機材の遅れは当社の都合です。まずお詫びし、受けられるもの（食事券）を案内します。', '사실과 다른 설명으로 언쟁이 될 뻔했습니다. 도착 기재 지연은 당사 사정입니다. 먼저 사과하고 받을 수 있는 것(식사 쿠폰)을 안내합니다.', 'You argued with something untrue: a late inbound aircraft is the airline\'s cause. Apologise and offer what applies (the meal voucher).') }] }
  };
  function runClaim() {
    var c = S.cur, p = c && c.p, K = p && CLAIMS[p.claim]; if (!K || c.flags.claimDone) return;
    c.flags.claimDone = true; sfx.ng(); say('pax', p.say.claim);
    var opts = shufOpts([{ t: K.ok, good: true }].concat(K.bad), 'claim-' + p.claim);
    modal(K.title, K.fact(), K.must, opts.map(function (o) {
      return { t: o.t, good: o.good, code: o.code, run: function () {
        if (o.good) { addTime(1); mood(+12); evCheck(K.evId, true); say('me', K.okSay); if (K.after) K.after(c); var me = c; setTimeout(function () { if (S.cur === me && G.screen === 'play') say('pax', p.say.claimOk); }, 2600); note('good', function () { return tx(K.okNote); }, K.lesson); }
        else { addTime(.5); mood(o.m); evCheck(K.evId, false); act(c, o.code, 'claim-' + p.claim); note('bad', function () { return tx(o.n); }, K.lesson, o.code); }
      } };
    }), K.lesson, function () { showTab(c.tab); });
  }
  /* E5-02 예약 초과: SV가 실제 탑승 예상을 확인 → 자원자에게 조건 설명·동의 → 대체편. 카운터에서 비자발 탑승 거절을 정하지 않음 */
  function runOverbook() {
    S.ob = { asked: {}, resp: {} }; sfx.ng(); STG.pose('explain');
    modal(L('運航情報：予約が座席数を上回っています', '운항 정보: 예약이 좌석 수를 넘었습니다', 'Ops information: bookings exceed seats'), V.flight + ' · ' + tx(L('販売 ', '판매 ', 'Sold ')) + M.sold + ' / ' + tx(L('座席 ', '좌석 ', 'Seats ')) + M.seats,
      L('予約が座席数を上回っても、カウンターで搭乗をお断りする人を決めません。SVが実際の搭乗見込み（チェックイン済み・未着・ブロック席）を確認し、まず自発的に協力してくださる方を募ります。協力者には条件を説明し、同意を得てから手続きします。自発的な協力者が足りないときの判断はSVが行います。', '예약이 좌석 수를 넘어도 카운터에서 탑승을 거절할 사람을 정하지 않습니다. SV가 실제 탑승 예상(체크인 완료·미도착·블록 좌석)을 확인하고, 먼저 자발적으로 협력해 줄 분을 찾습니다. 협력자에게는 조건을 설명하고 동의를 받은 뒤 수속합니다. 자발적 협력자가 부족할 때의 판단은 SV가 합니다.', 'Even when bookings exceed seats, the counter does not pick who is denied boarding. The SV confirms the real expected numbers (checked in, not yet arrived, blocked seats) and first seeks volunteers. Explain the terms to volunteers and proceed only with consent. If there are not enough volunteers, the SV decides.'),
      [{ t: L('SVに、チェックイン済み・未着・ブロック席を含めた実際の搭乗見込みと、対応の指示を確認する', 'SV에게 체크인 완료·미도착·블록 좌석을 포함한 실제 탑승 예상과 대응 지시를 확인한다', 'Confirm with the SV the real expected numbers (checked in, not arrived, blocked seats) and how to proceed'), s: L('約2分', '약 2분', '~2 min'),
        run: function () { addTime(2); S.ob.sv = true; evCheck('ob-sv', true); S.evRep.need++; S.evRep.done++; } },
       { t: L('列の最後のお客様に、満席なので乗れないと伝える', '줄의 마지막 승객에게 만석이라 탈 수 없다고 전한다', 'Tell the last person in the queue the flight is full and they cannot board'),
        run: function () { addTime(1); evCheck('ob-sv', false); S.evRep.need++; S.ob.invol = true; evNote('bad', function () { return tx(L('カウンターの判断で、お客様に搭乗をお断りしようとしました（非自発的な搭乗拒否）。まずSVが実際の人数を確認し、自発的な協力者を募ります。SVが止めて手順をやり直しました。', '카운터 판단으로 승객의 탑승을 거절하려 했습니다(비자발적 탑승 거절). 먼저 SV가 실제 인원을 확인하고 자발적 협력자를 찾습니다. SV가 막고 절차를 다시 했습니다.', 'You tried to deny a passenger boarding on your own judgement (involuntary). The SV must confirm the real numbers and seek volunteers first. The SV stepped in and restarted the process.')); }, 'passenger/1-5', 'ob-involuntary'); } },
       { t: L('ゲートで調整されるはずなので、何もせずに受付を続ける', '게이트에서 조정될 테니 아무것도 하지 않고 접수를 계속한다', 'Do nothing — the gate will sort it out'),
        run: function () { evCheck('ob-sv', false); S.evRep.need++; evNote('bad', function () { return tx(L('運航情報を受けても何もしませんでした。搭乗口で人数が合わずに混乱します。SVが改めて協力者を募るよう指示しました。', '운항 정보를 받고도 아무것도 하지 않았습니다. 탑승구에서 인원이 맞지 않아 혼란해집니다. SV가 다시 협력자를 찾도록 지시했습니다.', 'You did nothing with the ops information; the numbers would not add up at the gate. The SV told you to seek volunteers.')); }, 'passenger/1-5', 'ob-ignore'); } }],
      'passenger/1-5', function () { drawVol(); });
  }
  function drawVol() {
    var O = S.ob, q = S.list.slice(S.idx + 1);
    var h = '<div class="must">' + STG.mascot('korarin', 'idle', 'km') + '<div><b>' + esc(tx(L('SVの確認と指示', 'SV의 확인과 지시', 'The SV\'s check and instructions'))) + '</b> ' + esc(tx(L('「チェックイン済みと未着を合わせた搭乗見込みは181名で、1席足りません。まだ手続き前の列のお客様に、自発的に協力してくださる方を1名募ってください。乗り継ぎのある方・同行者と一緒の方・介助が必要な方にはお願いしません。」', '「체크인 완료와 미도착을 합친 탑승 예상은 181명으로 1석이 부족합니다. 아직 수속 전인 줄의 승객에게 자발적으로 협력해 줄 분을 1명 찾아 주세요. 연결편이 있는 분·동행자와 함께인 분·도움이 필요한 분에게는 부탁하지 않습니다.」', '"With checked-in and not-yet-arrived passengers we expect 181, one seat short. Ask the people still in the queue for one volunteer. Do not ask anyone with a connection, travelling with a companion, or needing assistance."'))) + '</div></div>';
    h += '<div class="chk"><b>' + esc(tx(L('協力の条件（Vela Air 教育用）', '협력 조건(Vela Air 교육용)', 'Volunteer terms (Vela Air, training)'))) + '</b><ul class="small" style="margin:4px 0 0;padding-left:18px"><li>' + esc(tx(L('代替便 ', '대체편 ', 'Alternative flight '))) + V.alt.flight + ' · ' + esc(tx(L('本日', '오늘', 'today'))) + ' ' + V.alt.dep + ' · ' + esc(tx(L('座席はSVが確保済み', '좌석은 SV가 확보함', 'seat held by the SV'))) + '</li><li>' + esc(tx(L('協力へのお礼：SVが承認した内容（会社・国で異なるため、ここでは金額を出しません）', '협력 보상 조건: SV가 승인한 내용(회사·나라마다 달라 여기서는 금액을 표시하지 않음)', 'Thanks for volunteering: what the SV has approved (it varies by airline and country, so no amount is shown here)'))) + '</li><li>' + esc(tx(L('食事券・手荷物は代替便で', '식사 쿠폰·수하물은 대체편으로', 'Meal voucher; bags travel on the alternative flight'))) + '</li></ul></div>';
    h += q.map(function (p) {
      var tags = [];
      if (p.pair) tags.push(tx(L('同行者（別予約）', '동행자(별도 예약)', 'Companion (separate booking)')));
      if (p.conn) tags.push(tx(L('乗り継ぎあり', '연결편 있음', 'Has a connection')));
      var st = O.vol === p.id ? '<span class="pill ' + (O.consent ? 'ok' : 'warn') + '">' + esc(tx(O.consent ? L('協力者（同意済み）', '협력자(동의 완료)', 'Volunteer (consented)') : L('協力者に登録（同意なし）', '협력자로 등록(동의 없음)', 'Listed (no consent)'))) + '</span>' : '';
      var resp = O.resp[p.id] ? '<div class="small">「' + esc(tx(O.resp[p.id])) + '」</div>' : '';
      var btns = O.vol === p.id ? '' : '<div class="btns" style="margin:0"><button class="btn" data-a="ask" data-p="' + p.id + '" ' + (O.asked[p.id] ? 'disabled' : '') + '>' + esc(tx(L('条件を説明して協力をお願いする', '조건을 설명하고 협력을 부탁한다', 'Explain the terms and ask'))) + '</button><button class="btn ghost rebtn" data-a="list" data-p="' + p.id + '">' + esc(tx(L('説明せずに協力者として登録する', '설명 없이 협력자로 등록한다', 'List them without explaining'))) + '</button></div>';
      return '<div class="swrow' + (O.vol === p.id ? ' done' : '') + '"><div><b>' + p.pp.sur + ' ' + p.pp.given + '</b> <span class="small">' + esc(tags.join(' · ')) + '</span>' + resp + '</div>' + st + btns + '</div>';
    }).join('');
    h += '<div id="whybox"></div><div class="btns"><button class="btn pri" data-a="done" ' + (O.vol ? '' : 'disabled') + '>' + esc(tx(L('協力者をSVに報告して受付に戻る', '협력자를 SV에 보고하고 접수로 돌아가기', 'Report the volunteer to the SV and go back to check-in'))) + '</button><button class="btn" data-a="giveup">' + esc(tx(L('協力者が見つからないので、SVの判断に任せる', '협력자를 찾지 못해 SV 판단에 맡긴다', 'No volunteer found — leave it to the SV'))) + '</button></div>';
    var card = openModalShell(L('予約超過 ― 自発的な協力者を募る', '예약 초과 — 자발적 협력자 찾기', 'Overbooking — ask for a volunteer'), h);
    S.modalRedraw = drawVol;
    card.onclick = function (e) { var b = e.target.closest('[data-a]'); if (!b || b.disabled) return; volAct(b.dataset.a, b.dataset.p); };
  }
  function volAct(a, id) {
    var O = S.ob, p = S.list.filter(function (x) { return x.id === id; })[0];
    if (a === 'ask') {
      O.asked[id] = true; addTime(1.5); sfx.tap();
      if (p.pair || p.conn) O.protectAsked = true;
      O.resp[id] = p.say.ask || L('すみません、今日はちょっと…。', '죄송해요, 오늘은 좀….', 'Sorry, not today….');
      if (p.willVol) { O.vol = id; O.consent = true; O.listed = false; }
      return drawVol();
    }
    if (a === 'list') { O.vol = id; O.consent = false; O.listed = true; if (p.pair || p.conn) O.protectAsked = true; addTime(.5); sfx.tap(); return drawVol(); }
    if (a === 'done' || a === 'giveup') {
      if (a === 'giveup') { O.vol = null; O.consent = false; }
      evCheck('ob-consent', !!(O.vol && O.consent && !O.listed)); evCheck('ob-protect', !O.protectAsked);
      if (O.listed) evNote('bad', function () { return tx(L('条件を説明せず、同意も得ないまま協力者として登録しました。協力は、条件を理解したうえでの自発的な同意が前提です。', '조건을 설명하지 않고 동의도 받지 않은 채 협력자로 등록했습니다. 협력은 조건을 이해한 뒤의 자발적 동의가 전제입니다.', 'You listed someone as a volunteer without explaining or getting consent. Volunteering means agreeing freely after understanding the terms.')); }, 'passenger/1-5', 'ob-noconsent');
      if (O.protectAsked) evNote('bad', function () { return tx(L('SVの指示で対象外とした方（同行者と一緒・乗り継ぎあり）に協力をお願いしました。', 'SV 지시로 대상에서 뺀 분(동행자와 함께·연결편 있음)에게 협력을 부탁했습니다.', 'You asked someone the SV had excluded (travelling with a companion or connecting).')); }, 'passenger/1-5', 'ob-protect');
      if (a === 'giveup') evNote('bad', function () { return tx(L('自発的な協力者が見つからず、SVの判断に任せました。協力していただけそうな方（乗り継ぎ・同行者なし）に、条件を説明してお願いできていたかを振り返りましょう。', '자발적 협력자를 찾지 못해 SV 판단에 맡겼습니다. 협력해 줄 만한 분(연결편·동행자 없음)에게 조건을 설명하고 부탁했는지 되돌아봅시다.', 'No volunteer was found and the SV had to decide. Did you explain the terms to someone eligible (no connection, no companion)?')); }, 'passenger/1-5', 'ob-novol');
      else if (O.consent && !O.listed && !O.protectAsked) evNote('good', function () { return tx(L('予約超過で、SVの確認のうえ、対象となる方に条件を説明して自発的な協力の同意を得ました。', '예약 초과에서 SV 확인 후 대상이 되는 분에게 조건을 설명하고 자발적 협력 동의를 받았습니다.', 'With the SV\'s check, you explained the terms to an eligible passenger and got a voluntary agreement.')); }, 'passenger/1-5');
      addTime(1); closeModal(); nextPax();
    }
  }

  /* ================= Day 3 : 도움이 필요한 승객 — 휠체어(D3-01)·UM(D3-02)·반려동물(D3-03)·임산부(D3-04)·가족(D3-05)·마감 후 도착(D3-06) ================= */
  function R3() { return M.rules || {}; }
  /* 22차(GPT 실주소 SITE-F01): 사이트의 떠 있는 위로·뒤로·홈 버튼이 근무 중 대사를 가리지 않게 — 근무 화면일 때만 body에 표시(CSS가 작은 화면에서 숨김) */
  /* 22차(GPT 실주소 권장): 사이트에서는 근무를 시작하면 사이트 머리말 아래의 게임 맨 위(업무 바)로 — 낮은 가로 화면에서 머리말 때문에 장면이 화면 밖에서 시작하던 문제. 사이트 밖(단일·분할판)은 예전처럼 페이지 맨 위 */
  function topOfGame() { var a = document.getElementById('app'); if (SITE && a) { var y = a.getBoundingClientRect().top + window.pageYOffset - 6; window.scrollTo(0, Math.max(0, y)); } else window.scrollTo(0, 0); }
  function playCls() { try { document.body.classList.toggle('saga-playing', G.screen === 'play'); } catch (e) {} }
  /* 22차(SITE-R01): 레슨 참조를 실제 레슨 주소로. 주소 표는 사이트 빌드만 넣음(공개 사이트 sitemap에서 3개 언어가 모두 있는 레슨만). 새 탭으로 열어 게임 화면은 그대로 */
  function lessonA(id, label, cls) {
    var U = window.LESSON_URLS, u = U && U.links && U.links[id] && U.links[id][G.lang];
    if (!u) return cls ? '<span class="' + cls + '">' + esc(label) + '</span>' : esc(label);
    return '<a' + (cls ? ' class="' + cls + '"' : '') + ' href="' + esc(U.base + u) + '" target="_blank" rel="noopener">' + esc(label) + ' ↗</a>';
  }
  /* 22차: UM 지정석 문구는 정답 집합(R3().umSeats)에서 만든다 — 문구·강조·판정이 같은 집합을 봄 */
  function umRange() { var u = (R3().umSeats || []), rows = u.map(function (x) { return parseInt(x, 10); }), cols = []; u.forEach(function (x) { var c = x.slice(-1); if (cols.indexOf(c) < 0) cols.push(c); });
    var a = Math.min.apply(null, rows), b = Math.max.apply(null, rows), cs = cols.sort().join('・'), ck = cols.sort().join('·'), ce = cols.sort().join('/');
    return { ja: a + '〜' + b + '列の通路側（' + cs + '）', ko: a + '~' + b + '열 통로 쪽(' + ck + ')', en: 'rows ' + a + '–' + b + ', aisle (' + ce + ')' }; }
  function umRuleText() { var r = umRange(); return L('UMの座席：' + r.ja, 'UM 좌석: ' + r.ko, 'UM seats: ' + r.en); }
  function supState(c) {
    var p = c.p, s = c.sup, t = p.sup.type;
    if (t === 'wch') return s.arranged ? 'ok' : (s.asked || s.code) ? 'wait' : '';
    if (t === 'um') return s.formBad ? 'ng' : (s.guard && s.form && s.pouch && s.stay) ? 'ok' : (s.guard || s.form) ? 'wait' : '';
    if (t === 'pet') return s.docsBad ? 'ng' : (s.w && s.docs && s.fee) ? 'ok' : (s.w || s.docs) ? 'wait' : '';
    if (t === 'preg') return s.pregBad ? 'ng' : s.preg ? 'ok' : '';
    if (t === 'fam') return s.party ? 'ok' : '';
    return '';
  }
  function supRow(done, label, btnId, btnLabel, extra) {
    return '<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin:6px 0"><span style="flex:1;min-width:150px">' + esc(tx(label)) + '</span>' + (done ? '<span class="pill ok">' + esc(tx(done === true ? L('済', '완료', 'Done') : done)) + '</span>' : '<button class="btn" id="' + btnId + '">' + esc(tx(btnLabel)) + '</button>') + (extra || '') + '</div>';
  }
  function velaRule(t) { return '<div class="edu" style="margin-top:6px">' + esc(tx(L('Vela Air 教育用規定：', 'Vela Air 교육용 규정: ', 'Vela Air training rule: '))) + esc(tx(t)) + '</div>'; }
  function tabSup() {
    var c = S.cur, p = c.p; ({ wch: supWch, um: supUm, pet: supPet, preg: supPreg, fam: supFam })[p.sup.type](c, p);
    /* D3-RR01: 발권 후에는 지원 내용(수배·서류·판단)을 바꾸지 않는다. 바꾸려면 탑승권 무효화·재수배·재발행 절차(이번 범위 밖). 출발까지 공항에 남아 달라는 UM 부탁만 발권 뒤에도 가능 */
    if (c.bp) { $('#scr').querySelectorAll('button').forEach(function (b) { if (b.id === 'us') return; b.disabled = true; b.onclick = null; }); $('#scr').insertAdjacentHTML('beforeend', '<p class="small" style="color:var(--termwarn)">' + esc(tx(L('発券後は、サポートの手配・書類・判断を変えられません（変更は搭乗券の無効化と手配・発券のやり直しが必要）。', '발권 후에는 지원 수배·서류·판단을 바꿀 수 없습니다(변경하려면 탑승권 무효화와 수배·발권을 다시 해야 합니다).', 'After issue, the assistance, papers and decisions are locked (a change would need the boarding pass cancelled, re-arranged and reissued).'))) + '</p>'); }
  }

  /* D3-01 휠체어: 본인에게 물어 지원 수준을 정하고(WCHR/WCHS/WCHC) 수배 */
  var WCODE = {
    WCHR: L('WCHR：長い距離は歩けないが、階段・機内の席までは移動できる → ゲートまで車いす', 'WCHR: 먼 거리는 못 걷지만 계단·기내 자리까지는 이동 가능 → 게이트까지 휠체어', 'WCHR: cannot walk long distances, but manages stairs and the walk to the seat → wheelchair to the gate'),
    WCHS: L('WCHS：階段は無理だが、機内の席までは移動できる → 車いす＋階段のない搭乗（搭乗橋・リフト車）', 'WCHS: 계단은 못 오르내리지만 기내 자리까지는 이동 가능 → 휠체어 + 계단 없는 탑승(탑승교·리프트카)', 'WCHS: cannot do stairs, but can walk to the seat → wheelchair + step-free boarding (jet bridge or lift)'),
    WCHC: L('WCHC：席まで自分では移動できない → 機内用車いす・介助', 'WCHC: 자리까지 스스로 이동 불가 → 기내용 휠체어·보조', 'WCHC: cannot move to the seat unaided → aisle chair and carry assistance')
  };
  /* 과소 지원(실제 WCHS인데 WCHR) = 업무 확인 필요(최고 A, 2026-10-12 사용자 확정) / 그 밖의 코드 오류(과잉 지원) = 일반 */
  function wchKey(p, code) { return p.sup.need === 'WCHS' && code === 'WCHR' ? 'wch-under' : 'wch-code'; }
  function supWch(c, p) {
    var s = c.sup;
    var h = '<div class="h3">' + esc(tx(L('移動のサポート（車いす）', '이동 지원(휠체어)', 'Mobility assistance (wheelchair)'))) + ' <span class="small mono">SSR ' + p.pnr.ssr.join(' ') + esc(tx(L('（予約時の申告）', '(예약 때 신고)', ' (from the booking)'))) + '</span></div>';
    h += '<p class="small">' + esc(tx(L('見た目や予約のコードだけで決めず、どこまでご自分で移動できるかをご本人に伺って、必要なサポートを決めます。', '겉모습이나 예약 코드만으로 정하지 말고, 어디까지 스스로 이동할 수 있는지 본인에게 여쭤 필요한 지원을 정합니다.', 'Do not decide from appearance or the booking code alone: ask how far the passenger can move unaided, then set the assistance.'))) + '</p>';
    h += supRow(s.asked, L('ご本人に、移動について伺う', '본인에게 이동에 대해 여쭙기', 'Ask the passenger about getting around'), 'wq', L('お席までの移動について、どのようなお手伝いが必要か伺う', '좌석까지 이동하실 때 어떤 도움이 필요한지 여쭙는다', 'Ask what help they need to reach their seat'));
    h += '<div class="chk">' + Object.keys(WCODE).map(function (k) { return '<button class="opt' + (s.code === k ? ' on' : '') + '" data-wc="' + k + '" style="margin:4px 0;width:100%;text-align:left' + (s.code === k ? ';outline:2px solid var(--ok,#3c9)' : '') + '"' + (c.bp || (s.arranged && !s.reopen) ? ' disabled' : '') + '>' + esc(tx(WCODE[k])) + '</button>'; }).join('') + '</div>';
    h += supRow(s.arranged ? L('手配済み', '수배 완료', 'Arranged') : false, L('車いす・搭乗の介助を手配（ゲート・機内まで、到着地にも連絡）', '휠체어·탑승 보조 수배(게이트·기내까지, 도착지에도 연락)', 'Arrange the wheelchair and boarding help (to the gate and aircraft; tell the arrival station)'), 'wa', L('手配する', '수배하기', 'Arrange'), s.arranged && !c.bp && !s.reopen ? ' <button class="btn ghost rebtn" id="wre">' + esc(tx(L('サポートを確認し直す・手配を変更', '지원 다시 확인·수배 변경', 'Re-check support / change the arrangement'))) + '</button>' : '');
    if (s.reopen) h += '<p class="small" style="color:var(--termwarn)">' + esc(tx(L('区分を変えると今の手配は取り消され、ゲート・到着地への連絡を含めて手配し直します。', '구분을 바꾸면 지금 수배는 취소되고, 게이트·도착지 연락을 포함해 다시 수배합니다.', 'Changing the level cancels the current arrangement; arrange again, including telling the gate and arrival station.'))) + '</p>';
    h += velaRule(L('車いすのお客様・介助が必要なお客様は非常口座席に座れません。通路側など移動しやすい席を考えます。', '휠체어·보조가 필요한 승객은 비상구 좌석에 앉을 수 없습니다. 통로 쪽 등 이동하기 쉬운 자리를 생각합니다.', 'Wheelchair users and passengers needing help may not sit in exit rows. Think of an easy-to-reach seat, such as an aisle.'));
    scr(h);
    if ($('#wq')) $('#wq').onclick = function () { if (c.bp) return; s.asked = true; addTime(.6); sfx.tap(); say('me', L('お席までの移動について、どのようなお手伝いが必要でしょうか。', '좌석까지 이동하실 때 어떤 도움이 필요하십니까?', 'What assistance would you need to reach your seat?')); var me = c; setTimeout(function () { if (S.cur === me && G.screen === 'play') say('pax', p.say.need); }, 600); tabSup(); renderTabs(); };
    $('#scr').querySelectorAll('[data-wc]').forEach(function (b) { b.onclick = function () {
      if (c.bp || (s.arranged && !s.reopen)) return; var k = b.dataset.wc;
      if (s.arranged && s.reopen) { s.reopen = false; if (k !== s.arrCode) { s.arranged = false; act(c, s.arrCode === p.sup.need ? wchKey(p, k) : wchKey(p, s.arrCode), 'changed-code-' + k); } }
      s.code = k; if (!s.asked) { s.guess = true; act(c, 'wch-guess', 'selected-before-asking'); } addTime(.2); sfx.tap(); tabSup(); renderTabs(); }; });
    if ($('#wre')) $('#wre').onclick = function () { if (c.bp) return; s.reopen = true; if (s.arrCode !== p.sup.need) tryFix(c, wchKey(p, s.arrCode)); else act(c, 'wch-recheck', 'recheck'); addTime(.3); sfx.tap(); tabSup(); renderTabs(); };
    if ($('#wa')) $('#wa').onclick = function () {
      if (c.bp) return;
      if (!s.code) { sfx.ng(); return modal(L('サポートの区分を先に決めます', '지원 구분을 먼저 정합니다', 'Choose the assistance level first'), 'SSR ' + p.pnr.ssr.join(' '), L('手配の前に、ご本人に伺った内容から WCHR / WCHS / WCHC を選びます。', '수배 전에 본인에게 여쭌 내용으로 WCHR / WCHS / WCHC를 고릅니다.', 'Before arranging, choose WCHR / WCHS / WCHC from what the passenger told you.'), [{ t: L('戻る', '돌아가기', 'Back'), run: function () {} }], 'passenger/1-7', function () { tabSup(); }); }
      c.notes = c.notes.filter(function (n) { return n.c !== 'wch-ok'; });
      s.arranged = true; s.reopen = false; s.arrCode = s.code; if (!s.asked) s.arrNoAsk = true; addTime(1.5); sfx.ok(); p.art = 'passenger_male_06_wheelchair'; drawPax(); say('pax', p.say.thanksSup);
      if (s.code !== p.sup.need) act(c, wchKey(p, s.code), 'arranged-' + s.code);
      else if (s.asked) { fixDone(c, 'wch-under'); fixDone(c, 'wch-code'); if (s.guess && !s.arrNoAsk && c.selfFix.indexOf('wch-guess') < 0) { act(c, 'wch-guess', 'asked-and-corrected-before-arranging'); selfFix(c, 'wch-guess'); } }
      if (s.code === p.sup.need && s.asked) note('good', function () { return tx(L('ご本人に移動の状態を伺い、' + p.sup.need + 'として車いすと搭乗の介助を手配しました' + (p.sup.need === 'WCHS' ? '（階段のない搭乗も）' : '') + '。', '본인에게 이동 상태를 여쭤 ' + p.sup.need + '로 휠체어와 탑승 보조를 수배했습니다' + (p.sup.need === 'WCHS' ? '(계단 없는 탑승도)' : '') + '.', 'You asked how the passenger moves and arranged a wheelchair and boarding help as ' + p.sup.need + (p.sup.need === 'WCHS' ? ' (with step-free boarding)' : '') + '.')); }, 'passenger/1-7', 'wch-ok');
      tabSup(); renderTabs();
    };
  }
  /* 본인 휠체어(수동) 위탁: 이동 보조기구 — 무료, 배터리 없음 확인, 도착 시 기측 인도 */
  function decideMob(i) {
    var c = S.cur, p = c.p, fee = R.airline.VELA.excessWeight[G.country];
    modal(L('お客様の車いす（折りたたみ・手動）', '승객의 휠체어(접이식·수동)', 'The passenger\'s own wheelchair (folding, manual)'), c.bags[i].w.toFixed(1) + ' kg · ' + tx(L('電池なし（手動）', '배터리 없음(수동)', 'No battery (manual)')),
      L('お客様の車いすなどの移動補助具は、無料手荷物の個数・重さとは別に無料で運びます。電動かどうか（電池の種類・取り外し）を確認し、壊れやすい部分を保護して、到着地でどこで返すか（機側・手荷物受取所）をご本人と決めます。', '승객의 휠체어 등 이동 보조기구는 무료 수하물 개수·무게와 별도로 무료로 운송합니다. 전동인지(배터리 종류·분리) 확인하고, 깨지기 쉬운 부분을 보호하며, 도착지에서 어디서 돌려드릴지(기측·수하물 수취대)를 본인과 정합니다.', 'Mobility aids such as the passenger\'s own wheelchair travel free, outside the free bag count and weight. Check whether it is powered (battery type, removal), protect fragile parts and agree where it will be returned at arrival (aircraft side or baggage claim).'),
      [{ t: L('移動補助具として無料で受け付ける（手動・電池なしを確認、足のせ等を保護、到着地での返却場所〈機側など〉をご本人の希望と空港・機材の条件で確認して記録）', '이동 보조기구로 무료 접수(수동·배터리 없음 확인, 발판 등 보호, 도착지 인도 장소〈기측 등〉를 본인 희망과 공항·기재 조건으로 확인해 기록)', 'Accept it free as a mobility aid (confirm manual with no battery, protect the footrests, and record where it will be returned at arrival — e.g. aircraft side — after checking the passenger\'s wishes and the airport and aircraft conditions)'), s: L('約2分', '약 2분', '~2 min'),
        run: function () { addTime(2); c.bags[i].mobOk = true; c.bags[i].ex = true; note('good', function () { return tx(L('お客様の車いすを移動補助具として無料で受け付け、到着地での返却場所を確認して記録しました。', '승객의 휠체어를 이동 보조기구로 무료 접수하고 도착지 인도 장소를 확인해 기록했습니다.', 'You accepted the wheelchair free as a mobility aid and recorded the agreed return point at arrival.')); }, 'passenger/2-2'); } },
       { t: L('2個目の手荷物として追加料金を案内する', '2개째 수하물로 추가 요금을 안내한다', 'Charge it as a second bag'), s: (fee.cur === 'JPY' ? '¥' : '₩') + fee.amt.toLocaleString(),
        run: function () { addTime(2); mood(-14); c.bags[i].mobOk = true; c.bags[i].ex = true; S.revenue.push({ pax: p.pp.sur, amt: fee.amt, cur: fee.cur, what: 'EXTRA PIECE' }); note('bad', function () { return tx(L('お客様の車いすは移動補助具で、無料で運ぶものでした。手荷物の追加料金をいただいてしまいました。', '승객의 휠체어는 이동 보조기구라 무료로 운송하는 것이었습니다. 수하물 추가 요금을 받아 버렸습니다.', 'The wheelchair is a mobility aid and travels free. You charged it as an extra bag.')); }, 'passenger/2-2', 'fee-mob'); } }],
      'passenger/2-2', function () { tabBag(); renderTabs(); });
  }

  /* D3-02 UM: 출발 보호자 확인 → 신청서(인계서) 확인 → 서명·파우치 → 보호자는 출발까지 공항에 */
  function supUm(c, p) {
    var s = c.sup, u = p.sup, g = u.guard, rv = u.recv;
    var h = '<div class="h3">' + esc(tx(L('お一人で旅行するお子様（UM）', '혼자 여행하는 어린이(UM)', 'Unaccompanied minor (UM)'))) + ' <span class="small mono">SSR ' + p.pnr.ssr.join(' ') + '</span></div>';
    h += velaRule(L('5〜11歳のお一人での旅行はUMが必須／5歳未満はお一人では不可／12〜15歳は希望制（年齢は搭乗日で数える）。UMの座席は ' + umRange().ja + '。', '5~11세 혼자 여행은 UM 필수 / 5세 미만은 혼자 불가 / 12~15세는 선택(나이는 탑승일 기준). UM 좌석은 ' + umRange().ko + '.', 'Ages 5–11 travelling alone must use UM; under 5 cannot travel alone; 12–15 optional (age on the day of travel). UM seats: ' + umRange().en + '.'));
    h += supRow(s.guard, L('出発地の保護者の本人確認（身分証・連絡先）', '출발지 보호자 본인 확인(신분증·연락처)', 'Check the departure guardian\'s ID and contact'), 'ug', L('確認する', '확인하기', 'Check'));
    if (s.guard) h += '<p class="small mono" style="margin:0 0 6px">' + g.sur + ' ' + g.given + ' · ' + esc(tx(g.rel)) + ' · ' + esc(tx(g.idDoc)) + ' ✓ · TEL ' + g.tel + '</p>';
    if (!s.formOpen) h += supRow(false, L('UM申込書（引き渡し書）を確認する', 'UM 신청서(인계서) 확인', 'Check the UM form (handover form)'), 'uf', L('申込書を見る', '신청서 보기', 'Open the form'));
    else {
      var blank = u.blank && !s.filled;
      h += '<table class="cx mono" style="margin:6px 0"><tr><td>' + esc(tx(L('お子様', '어린이', 'Child'))) + '</td><td>' + p.pp.sur + ' ' + p.pp.given + ' · ' + u.age + esc(tx(L('歳', '세', ' yrs'))) + ' · ' + V.flight + ' ' + V.from + '→' + V.to + '</td></tr>' +
        '<tr><td>' + esc(tx(L('出発地の保護者', '출발지 보호자', 'Departure guardian'))) + '</td><td>' + g.sur + ' ' + g.given + ' (' + esc(tx(g.rel)) + ') · ' + g.tel + '</td></tr>' +
        '<tr><td>' + esc(tx(L('到着地の引き取り人', '도착지 인수인', 'Arrival receiver'))) + '</td><td>' + rv.sur + ' ' + rv.given + ' (' + esc(tx(rv.rel)) + ') · ' + (blank ? '—' : rv.tel) + '</td></tr>' +
        '<tr><td>' + esc(tx(L('引き取り人の身分証', '인수인 신분증', 'Receiver ID'))) + '</td><td>' + esc(tx(L('到着時に提示（旅券）', '도착 시 제시(여권)', 'Shown at arrival (passport)'))) + '</td></tr></table>';
      if (!s.form) h += '<div class="btns"><button class="btn" id="uok">' + esc(tx(L('記入もれはない', '빠진 칸 없음', 'Nothing missing'))) + '</button><button class="btn warnb" id="ung">' + esc(tx(L('未記入の欄がある → 保護者に確認して記入', '빈 칸이 있음 → 보호자에게 확인해 기재', 'Something is missing → ask the guardian and fill it in'))) + '</button></div>';
      else h += '<div><span class="pill ' + (s.formBad ? 'ng' : 'ok') + '">' + esc(tx(s.formBad ? L('記入もれのまま', '빈 칸 그대로', 'Left incomplete') : L('確認済み', '확인 완료', 'Checked'))) + '</span>' + (!c.bp && s.form ? ' <button class="btn ghost rebtn" id="ure">' + esc(tx(L('もう一度確認', '다시 확인', 'Check again'))) + '</button>' : '') + '</div>';
    }
    h += supRow(s.pouch, L('保護者の署名をもらい、書類をパウチに入れてお子様の首に掛ける', '보호자 서명을 받고 서류를 파우치에 넣어 어린이 목에 건다', 'Get the guardian\'s signature, put the papers in the pouch and hang it round the child\'s neck'), 'up', L('署名・パウチ', '서명·파우치', 'Sign and pouch'), s.pouch ? '<img src="' + STG.src('prop_um_pouch_01') + '" alt="" style="height:44px">' : '');
    h += supRow(s.stay, L('保護者に、飛行機が出発するまで空港に残っていただくようお願いする', '보호자에게 비행기가 출발할 때까지 공항에 남아 달라고 부탁한다', 'Ask the guardian to stay at the airport until the flight departs'), 'us', L('お願いする', '부탁하기', 'Ask'));
    scr(h);
    if ($('#ug')) $('#ug').onclick = function () { if (c.bp) return; s.guard = true; addTime(.8); sfx.tap(); tabSup(); renderTabs(); };
    if ($('#uf')) $('#uf').onclick = function () { s.formOpen = true; addTime(.5); sfx.tap(); tabSup(); };
    if ($('#uok')) $('#uok').onclick = function () { if (c.bp) return; s.form = true; addTime(.2); if (u.blank && !s.filled) { s.formBad = true; act(c, 'um-handover', c.fixTry['um-handover'] ? 'judged-complete-again' : 'judged-complete'); } sfx.tap(); tabSup(); renderTabs(); };
    if ($('#ung')) $('#ung').onclick = function () {
      if (c.bp) return; s.form = true; addTime(1.2); sfx.tap();
      if (u.blank) { s.filled = true; s.formBad = false; fixDone(c, 'um-handover'); say('pax', p.say.form); note('good', function () { return tx(L('申込書の引き取り人の連絡先が未記入だと気づき、保護者に確認して記入しました。', '신청서의 인수인 연락처가 비어 있는 것을 알아차리고 보호자에게 확인해 기재했습니다.', 'You noticed the receiver\'s phone number was missing and filled it in with the guardian.')); }, 'passenger/1-7'); }
      else { mood(-3); note('info', function () { return tx(L('申込書は記入もれがありませんでした（確認に時間を使いました）。', '신청서에는 빈 칸이 없었습니다(확인에 시간을 썼습니다).', 'The form was complete (the extra check took time).')); }, 'passenger/1-7'); }
      tabSup(); renderTabs();
    };
    if ($('#ure')) $('#ure').onclick = function () { if (s.formBad) { s.formBad = false; tryFix(c, 'um-handover'); } s.form = false; s.pouch = false; addTime(.3); sfx.tap(); tabSup(); renderTabs(); };
    if ($('#up')) $('#up').onclick = function () { if (c.bp) return;
      if (!s.guard || !s.form) { sfx.ng(); return modal(L('先に確認を終えます', '먼저 확인을 끝냅니다', 'Finish the checks first'), 'UM', L('署名の前に、保護者の本人確認と申込書の内容確認を終えます。', '서명 전에 보호자 본인 확인과 신청서 내용 확인을 끝냅니다.', 'Before the signature, check the guardian\'s ID and the form.'), [{ t: L('戻る', '돌아가기', 'Back'), run: function () {} }], 'passenger/1-7', function () { tabSup(); }); }
      s.pouch = true; addTime(1); sfx.ok(); tabSup(); renderTabs();
    };
    if ($('#us')) $('#us').onclick = function () { s.stay = true; addTime(.3); sfx.tap(); say('me', L('飛行機が出発するまで、空港に残っていただけますか。出発しましたらお知らせします。', '비행기가 출발할 때까지 공항에 남아 계실 수 있을까요? 출발하면 알려 드리겠습니다.', 'Could you stay at the airport until the flight departs? We will let you know once it has left.')); var me = c; setTimeout(function () { if (S.cur === me && G.screen === 'play') say('pax', p.say.stay); }, 600); tabSup(); renderTabs(); };
  }

  /* D3-03 반려동물(PETC): 케이지째 계량 → 검역 서류(행선지 조건) → 요금 */
  function petDocs(u) {
    return u.toKR ? [[L('マイクロチップ', '마이크로칩', 'Microchip'), true], [L('狂犬病予防注射の証明', '광견병 예방접종 증명', 'Rabies vaccination certificate'), true], [L('日本の動物検疫所の輸出検疫証明書（出国前に取得）', '일본 동물검역소 수출검역증명서(출국 전 취득)', 'Japanese animal quarantine export certificate (obtained before departure)'), u.kind !== 'docs']]
      : [[L('マイクロチップ', '마이크로칩', 'Microchip'), true], [L('狂犬病予防注射（2回以上）・抗体検査', '광견병 예방접종(2회 이상)·항체 검사', 'Rabies vaccinations (2+) and antibody test'), true], [L('日本到着40日前までの事前届出（受理書）', '일본 도착 40일 전까지 사전 신고(수리서)', 'Advance notice to Japan at least 40 days before arrival (acceptance)'), u.kind !== 'docs'], [L('韓国の輸出検疫証明書', '한국 수출검역증명서', 'Korean export quarantine certificate'), true]];
  }
  function supPet(c, p) {
    var s = c.sup, u = p.sup, rr = R3(), fee = rr.petFee[G.country];
    var h = '<div class="h3">' + esc(tx(L('ペット（機内持ち込み・PETC）', '반려동물(기내 반입·PETC)', 'Pet in the cabin (PETC)'))) + ' <span class="small mono">SSR ' + p.pnr.ssr.join(' ') + '</span></div>';
    h += '<p class="small">' + u.dog + ' · ' + esc(tx(L('小型の犬（ミックス）・ソフトケージ', '소형견(믹스)·소프트 케이지', 'small dog (mixed breed), soft carrier'))) + ' · ' + esc(tx(L('この便のPETC：', '이 편의 PETC: ', 'PETC on this flight: '))) + u.booked + '/' + rr.petcPerFlight + esc(tx(L('（このお客様を含む）', '(이 승객 포함)', ' (including this passenger)'))) + '</p>';
    h += velaRule(L('PETCはケージ込み' + rr.petcMaxKg + 'kg以下・1便' + rr.petcPerFlight + '匹まで・事前承認。超える場合は貨物室（AVIH）の条件（硬いケージ等）を別に確認し、満たさなければ運べません。短頭種はAVIH不可。座席は窓側（1列目・非常口は不可）。', 'PETC는 케이지 포함 ' + rr.petcMaxKg + 'kg 이하·편당 ' + rr.petcPerFlight + '마리·사전 승인. 넘으면 화물칸(AVIH) 조건(딱딱한 케이지 등)을 따로 확인하고, 충족하지 못하면 운송 불가. 단두종은 AVIH 불가. 좌석은 창가(1열·비상구 불가).', 'PETC: up to ' + rr.petcMaxKg + 'kg including the carrier, ' + rr.petcPerFlight + ' per flight, pre-approved. If heavier, check the hold (AVIH) conditions separately (e.g. a rigid kennel); if not met, it cannot travel. No snub-nosed breeds in AVIH. Seat: window (not row 1 or exit rows).'));
    h += supRow(s.w ? s.w.toFixed(1) + ' kg' : false, L('ケージごと重さを量る', '케이지째 무게를 잰다', 'Weigh the pet with the carrier'), 'pw', L('量る', '계량', 'Weigh'));
    if (!s.docsOpen) h += supRow(false, L('健康・検疫の書類を確認する（行き先の国の条件）', '건강·검역 서류 확인(행선지 나라 조건)', 'Check the health and quarantine papers (destination rules)'), 'pd', L('書類を見る', '서류 보기', 'Open the papers'));
    else {
      h += '<p class="small" style="margin:6px 0 0">' + esc(tx(L('主な項目（ほかの要件は事前の検疫確認で済んでいるという教育用の前提）', '주요 항목(그 밖의 요건은 사전 검역 확인으로 끝났다는 교육용 전제)', 'Main items (training assumption: the other requirements were cleared in advance)'))) + '</p><table class="cx docs" style="margin:6px 0">' + petDocs(u).map(function (d) { return '<tr><td>' + esc(tx(d[0])) + '</td><td>' + (d[1] ? '✓' : '<b>—</b>') + '</td></tr>'; }).join('') + '</table>';
      if (!s.docs) h += '<div class="btns"><button class="btn" id="pdok">' + esc(tx(L('書類はそろっている', '서류가 다 있음', 'All papers are there'))) + '</button><button class="btn warnb" id="pdng">' + esc(tx(L('不足がある', '부족한 것이 있음', 'Something is missing'))) + '</button></div>';
      else h += '<span class="pill ' + (s.docsBad ? 'ng' : 'ok') + '">' + esc(tx(s.docsBad ? L('不足のまま受付', '부족한 채 접수', 'Accepted with papers missing') : L('確認済み', '확인 완료', 'Checked'))) + '</span>' + (s.docsBad && !c.bp ? ' <button class="btn ghost rebtn" id="pdre">' + esc(tx(L('もう一度確認', '다시 확인', 'Check again'))) + '</button>' : '');
    }
    h += supRow(s.fee ? (fee.cur === 'JPY' ? '¥' : '₩') + fee.amt.toLocaleString() : false, L('PETC料金を案内して受け取る（無料手荷物とは別・教育用の金額）', 'PETC 요금을 안내하고 받는다(무료 수하물과 별도·교육용 금액)', 'Explain and collect the PETC fee (separate from the bag allowance; training amount)'), 'pf', L('料金を受け取る', '요금 받기', 'Collect'));
    scr(h);
    if ($('#pw')) $('#pw').onclick = function () { if (c.bp) return; s.w = u.kg; addTime(.6); sfx.tap(); STG.bag('prop_pet_carrier_01'); $('#scalelcd').textContent = u.kg.toFixed(1); tabSup(); renderTabs(); if (u.kg > rr.petcMaxKg) decidePetOver(); };
    if ($('#pd')) $('#pd').onclick = function () { s.docsOpen = true; addTime(.8); sfx.tap(); tabSup(); };
    if ($('#pdok')) $('#pdok').onclick = function () { if (c.bp) return; s.docs = true; addTime(.2); if (u.kind === 'docs') { s.docsBad = true; act(c, 'pet-docs', c.fixTry['pet-docs'] ? 'judged-complete-again' : 'judged-complete'); } sfx.tap(); tabSup(); renderTabs(); };
    if ($('#pdng')) $('#pdng').onclick = function () { if (c.bp) return; addTime(.3); if (u.kind === 'docs') return decidePetDocs(); s.docs = true; mood(-8); sfx.ng(); note('bad', function () { return tx(L('書類はそろっていたのに「不足がある」として、お客様を待たせました。', '서류가 다 있었는데 「부족하다」고 해서 승객을 기다리게 했습니다.', 'The papers were complete, but you said something was missing and kept the passenger waiting.')); }, 'passenger/1-8', 'pet-over-reject'); tabSup(); renderTabs(); };
    if ($('#pdre')) $('#pdre').onclick = function () { s.docsBad = false; s.docs = false; tryFix(c, 'pet-docs'); addTime(.3); sfx.tap(); tabSup(); renderTabs(); };
    if ($('#pf')) $('#pf').onclick = function () { if (c.bp) return; s.fee = true; addTime(1); sfx.print(); S.revenue.push({ pax: p.pp.sur, amt: fee.amt, cur: fee.cur, what: 'PETC' }); say('pax', p.say.fee); tabSup(); renderTabs(); };
  }
  function petHold(c, p, why) {
    c.chk.entry = c.chk.entry || 'ok'; c.flags.denied = true; c.flags.handover = true; svReport(c); fixDone(c, 'pet-docs');
    p.say.denyOk = p.say.petHold; note('good', why, 'passenger/1-8');
  }
  function decidePetOver() {
    var c = S.cur, p = c.p, u = p.sup, rr = R3(); say('pax', p.say.petOver);
    modal(L('PETCの重さを超えています', 'PETC 무게를 넘었습니다', 'Over the PETC weight'), u.kg.toFixed(1) + ' kg > ' + rr.petcMaxKg + ' kg',
      L('機内（PETC）の上限を超えたら、機内には入れません。貨物室（AVIH）は自動の切り替えではなく、別の条件（硬いケージ・温度・事前の手配など）を満たすか確認します。満たさなければ今日は運べないので、SVに報告し、準備と便の変更を案内します。', '기내(PETC) 상한을 넘으면 기내에 들일 수 없습니다. 화물칸(AVIH)은 자동 전환이 아니라 별도 조건(딱딱한 케이지·온도·사전 수배 등)을 충족하는지 확인합니다. 충족하지 못하면 오늘은 운송할 수 없으므로 SV에게 보고하고 준비와 편 변경을 안내합니다.', 'Above the PETC limit the pet cannot travel in the cabin. The hold (AVIH) is not an automatic switch: check its separate conditions (rigid kennel, temperature, advance arrangements). If not met, it cannot travel today — report to the SV and explain how to prepare and rebook.'),
      [{ t: L('機内では運べないと説明し、AVIHの条件を確認。布のケージは条件外のため、SVに報告して、硬いケージの準備と便の変更を案内する', '기내로는 운송할 수 없다고 설명하고 AVIH 조건을 확인. 천 케이지는 조건 밖이라 SV에게 보고하고 딱딱한 케이지 준비와 편 변경을 안내한다', 'Explain it cannot go in the cabin, check AVIH: the soft carrier does not qualify, so report to the SV and explain the rigid kennel and rebooking'), s: L('約4分', '약 4분', '~4 min'),
        run: function () { addTime(4); mood(-14); petHold(c, p, function () { return tx(L('PETCの重さの超過に気づき、AVIHの条件も確かめたうえでSVに報告し、準備と便の変更を案内しました。', 'PETC 무게 초과를 알아차리고 AVIH 조건도 확인한 뒤 SV에게 보고하고 준비와 편 변경을 안내했습니다.', 'You caught the PETC overweight, checked the AVIH conditions, reported to the SV and explained preparation and rebooking.')); }); } },
       { t: L('8kgを超えたので、そのまま貨物室（AVIH）でお預かりする', '8kg를 넘었으니 그대로 화물칸(AVIH)으로 맡는다', 'It is over 8kg, so take it in the hold (AVIH) as is'),
        run: function () { addTime(1.5); mood(-4); c.sup.w = u.kg; c.sup.avih = true; note('bad', function () { return tx(L('重さを超えたからといって、自動的に貨物室（AVIH）にしました。AVIHは硬いケージなど別の条件を満たす場合だけです（布のケージは不可）。', '무게를 넘었다고 자동으로 화물칸(AVIH)으로 했습니다. AVIH는 딱딱한 케이지 등 별도 조건을 충족할 때만입니다(천 케이지는 불가).', 'You switched to the hold (AVIH) automatically. AVIH needs separate conditions such as a rigid kennel — a soft carrier does not qualify.')); }, 'passenger/1-8', 'avih-auto'); } },
       { t: L('少しの超過なので、機内に通す', '조금 넘었을 뿐이니 기내로 통과시킨다', 'It is only a little over — let it go in the cabin'),
        run: function () { addTime(.3); c.sup.w = u.kg; c.sup.petcOver = true; note('bad', function () { return tx(L('PETCの上限（ケージ込み8kg）を超えたまま機内に通しました。', 'PETC 상한(케이지 포함 8kg)을 넘은 채 기내로 통과시켰습니다.', 'You let it into the cabin above the PETC limit (8kg with the carrier).')); }, 'passenger/1-8', 'petc-over'); } }],
      'passenger/1-8', function () { if (c.flags.denied) endPax(true); else { tabSup(); renderTabs(); } });
  }
  function decidePetDocs() {
    var c = S.cur, p = c.p, u = p.sup; say('pax', p.say.petDocs);
    modal(L('ペットの検疫書類が足りません', '반려동물 검역 서류가 부족합니다', 'The pet\'s quarantine papers are incomplete'), V.from + '→' + V.to + ' · ' + tx(u.toKR ? L('輸出検疫証明書なし', '수출검역증명서 없음', 'No export quarantine certificate') : L('40日前の事前届出なし・検疫所の特例確認なし', '40일 전 사전 신고 없음·검역소 특례 확인 없음', 'No 40-day advance notice, no special clearance from animal quarantine')),
      L('動物の検疫は、人の入国条件とは別です。行き先の国の条件を満たさない動物は、到着地で受け入れられず、送り返しや係留になります。書類がそろうまで運べないことを説明し、SVに報告します。', '동물 검역은 사람의 입국 조건과 별개입니다. 행선지 나라 조건을 충족하지 못한 동물은 도착지에서 받아들여지지 않고 반송·계류됩니다. 서류가 갖춰질 때까지 운송할 수 없음을 설명하고 SV에게 보고합니다.', 'Animal quarantine is separate from the passenger\'s entry rules. An animal that does not meet the destination\'s conditions is refused at arrival, returned or held. Explain it cannot travel until the papers are complete and report to the SV.'),
      [{ t: L('書類がそろうまで犬は運べないと説明し、SVに報告して、準備の方法と便の変更を案内する', '서류가 갖춰질 때까지 강아지는 운송할 수 없다고 설명하고 SV에게 보고해 준비 방법과 편 변경을 안내한다', 'Explain the dog cannot travel until the papers are complete, report to the SV and explain how to prepare and rebook'), s: L('約4分', '약 4분', '~4 min'),
        run: function () { addTime(4); mood(-14); c.sup.docs = true; petHold(c, p, function () { return tx(L('ペットの検疫書類の不足に気づき、SVに報告して、準備と便の変更を案内しました。', '반려동물 검역 서류 부족을 알아차리고 SV에게 보고해 준비와 편 변경을 안내했습니다.', 'You spotted the missing quarantine papers, reported to the SV and explained preparation and rebooking.')); }); } },
       { t: L('ご本人の入国条件は満たしているので、そのまま受け付ける', '본인의 입국 조건은 충족했으니 그대로 접수한다', 'The passenger meets the entry rules, so accept as is'),
        run: function () { addTime(.3); c.sup.docs = true; c.sup.docsBad = true; act(c, 'pet-docs', c.fixTry['pet-docs'] ? 'accepted-without-papers-again' : 'accepted-without-papers'); } }],
      'passenger/1-8', function () { if (c.flags.denied) endPax(true); else { tabSup(); renderTabs(); } });
  }

  /* D3-04 임산부: 소견서로 탑승일 주수를 계산해 Vela 기준과 비교 */
  function pregTruth(u) { var rr = R3(), lim = u.multi ? rr.pregMultiNoFrom : rr.pregNoFrom; if (u.days >= lim) return 'no'; if (u.days >= rr.pregCertFrom) return u.cert && (dt(M.date) - dt(u.cert)) / 864e5 <= rr.certValidDays ? 'ok' : 'cert'; return 'ok'; }
  function dt(s) { var a = s.split('-'); return Date.UTC(+a[0], +a[1] - 1, +a[2]); }
  function supPreg(c, p) {
    var s = c.sup, u = p.sup;
    var h = '<div class="h3">' + esc(tx(L('妊娠中のお客様', '임산부 승객', 'Pregnant passenger'))) + '</div>';
    h += velaRule(L('単胎は28週0日から診断書が必要（搭乗日の7日前以内に発行）・36週0日から搭乗不可／多胎は32週0日から搭乗不可。週数は搭乗日で数えます（出産予定日＝40週0日）。', '단태는 28주 0일부터 소견서 필요(탑승일 7일 전 이내 발급)·36주 0일부터 탑승 불가 / 다태는 32주 0일부터 탑승 불가. 주수는 탑승일 기준(분만 예정일 = 40주 0일).', 'Single pregnancy: a medical certificate from 28w0d (issued within 7 days before the flight); no travel from 36w0d. Multiple: no travel from 32w0d. Count weeks on the day of travel (due date = 40w0d).'));
    if (u.cert) h += '<div class="pp" style="grid-template-columns:1fr;margin-top:8px"><div class="t">MEDICAL CERTIFICATE · ' + esc(tx(L('診断書（教育用）', '소견서(교육용)', 'training'))) + '</div><div class="mono" style="font-size:13px">Patient ' + p.pp.sur + ' ' + p.pp.given + '<br>' + esc(tx(L('出産予定日', '분만 예정일', 'Estimated due date'))) + ' <b>' + u.edd + '</b><br>' + esc(tx(L('胎児', '태아', 'Pregnancy'))) + ' <b>' + esc(tx(u.multi ? L('多胎（双胎）', '다태(쌍태)', 'Multiple (twins)') : L('単胎', '단태', 'Single'))) + '</b><br>' + esc(tx(L('航空機での移動', '항공 여행', 'Air travel'))) + ': ' + esc(tx(L('支障なし', '지장 없음', 'Fit to fly'))) + '<br>' + esc(tx(L('発行日', '발급일', 'Issued'))) + ' <b>' + u.cert + '</b></div></div>';
    else h += '<p class="small" style="margin-top:8px">' + esc(tx(L('診断書なし。お客様の申告：出産予定日 ', '소견서 없음. 승객 신고: 분만 예정일 ', 'No certificate. The passenger says the due date is '))) + '<b class="mono">' + u.edd + '</b> · ' + esc(tx(L('単胎', '단태', 'single'))) + '</p>';
    h += '<p class="small" style="margin:6px 0 0">' + esc(tx(L('「支障なし」の記載があっても会社の受付基準は別に確認します。復路があれば、復路の搭乗日の週数・書類も確認して案内します。', '「지장 없음」 기재가 있어도 회사의 접수 기준은 따로 확인합니다. 귀국편이 있으면 귀국 탑승일의 주수·서류도 확인해 안내합니다.', 'Even with "fit to fly" on the certificate, check the company acceptance rule separately. If there is a return flight, check the weeks and papers for that date too.'))) + '</p>';
    h += '<p class="small mono" style="margin:6px 0">' + esc(tx(L('本日（搭乗日） ', '오늘(탑승일) ', 'Today (travel date) '))) + M.date + (p.ret ? ' · ' + esc(tx(L('復路 ', '귀국 ', 'Return '))) + p.ret.split(' ')[2] : '') + '</p>';
    if (!s.preg) h += '<div class="chk">' + [['ok', L('Vela の基準で受け付けられる（必要な書類はそろっている）', 'Vela 기준으로 접수 가능(필요한 서류가 갖춰짐)', 'Can be accepted under the Vela rule (the papers needed are in order)')], ['cert', L('診断書を取り直す必要がある（保留してSVに報告）', '소견서를 다시 받아야 함(보류하고 SV에게 보고)', 'Needs a new certificate (hold and report to the SV)')], ['no', L('週数の制限で搭乗できない（SVに報告して案内）', '주수 제한으로 탑승 불가(SV에게 보고하고 안내)', 'Cannot fly under the week limit (report to the SV and explain)')]].map(function (o) { return '<button class="opt" data-pg="' + o[0] + '" style="width:100%;text-align:left;margin:4px 0">' + esc(tx(o[1])) + '</button>'; }).join('') + '</div>';
    else h += '<span class="pill ' + (s.pregBad ? 'ng' : 'ok') + '">' + esc(tx(s.preg === 'ok' ? L('搭乗できると判断', '탑승 가능으로 판단', 'Judged fit to fly') : L('判断済み', '판단 완료', 'Decided'))) + '</span>' + (s.pregBad && !c.bp ? ' <button class="btn ghost rebtn" id="pgre">' + esc(tx(L('もう一度確認', '다시 확인', 'Check again'))) + '</button>' : '');
    scr(h);
    $('#scr').querySelectorAll('[data-pg]').forEach(function (b) { b.onclick = function () { if (c.bp) return; decidePreg(b.dataset.pg); }; });
    if ($('#pgre')) $('#pgre').onclick = function () { s.pregBad = false; s.preg = null; tryFix(c, 'preg-limit'); addTime(.3); sfx.tap(); tabSup(); renderTabs(); };
  }
  function decidePreg(v) {
    var c = S.cur, p = c.p, u = p.sup, t = pregTruth(u), s = c.sup, wk = Math.floor(u.days / 7) + 'w' + (u.days % 7) + 'd';
    addTime(.6);
    if (v === 'ok') {
      s.preg = 'ok'; sfx.tap();
      if (t !== 'ok') { s.pregBad = true; act(c, 'preg-limit', c.fixTry['preg-limit'] ? 'judged-fit-again' : 'judged-fit'); }
      else note('good', function () { return tx(L('出産予定日から搭乗日の週数（' + wk + '）を数え、Vela の基準で書類を確かめて受け付けました。', '분만 예정일로 탑승일 주수(' + wk + ')를 계산해 Vela 기준으로 서류를 확인하고 접수했습니다.', 'You worked out the weeks on the day of travel (' + wk + ') from the due date and checked the papers against the Vela rule.')); }, 'passenger/1-6');
      tabSup(); renderTabs(); return;
    }
    if (t === 'ok') { /* 과잉 판단: SV가 확인 → 탑승 가능 */
      addTime(3); mood(-16); s.preg = 'ok'; svReport(c); sfx.ng(); say('pax', p.say.pregOver);
      note('bad', function () { return tx(L('搭乗日は' + wk + 'で、Vela の基準では' + (u.cert ? '診断書も有効で' : '診断書の不要な時期で') + '搭乗できました。SVの確認で受け付けましたが、お客様を不安にさせ、時間もかかりました。', '탑승일은 ' + wk + '로 Vela 기준으로는 ' + (u.cert ? '소견서도 유효해' : '소견서가 필요 없는 시기라') + ' 탑승할 수 있었습니다. SV 확인으로 접수했지만 승객을 불안하게 하고 시간도 걸렸습니다.', 'On the day of travel it was ' + wk + ': under the Vela rule the passenger could fly' + (u.cert ? ' with a valid certificate' : ' with no certificate needed') + '. The SV cleared it, but you worried the passenger and lost time.')); }, 'passenger/1-6', 'preg-over');
      tabSup(); renderTabs(); return;
    }
    /* 보류(소견서) / 탑승 불가 */
    addTime(3); mood(-12); s.preg = v; svReport(c); fixDone(c, 'preg-limit'); c.flags.denied = true; c.flags.handover = true; c.chk.entry = c.chk.entry || 'ok';
    p.say.denyOk = t === 'cert' ? p.say.pregHold : p.say.pregNo;
    if (v === t) note('good', function () { return tx(t === 'cert' ? L('搭乗日は' + wk + 'で、診断書の発行日が搭乗日の7日前より古いことに気づき、保留してSVに報告しました（新しい診断書で再手続き）。', '탑승일은 ' + wk + '이고 소견서 발급일이 탑승일 7일 전보다 오래된 것을 알아차려 보류하고 SV에게 보고했습니다(새 소견서로 다시 수속).', 'It was ' + wk + ' and the certificate was older than 7 days, so you held and reported to the SV (re-check-in with a new certificate).') : L('搭乗日は' + wk + (u.multi ? '（多胎）' : '') + 'で Vela の制限を超えていたため、自分で診断せず規定を説明し、SVに報告しました。', '탑승일은 ' + wk + (u.multi ? '(다태)' : '') + '로 Vela 제한을 넘었기에 직접 진단하지 않고 규정을 설명한 뒤 SV에게 보고했습니다.', 'It was ' + wk + (u.multi ? ' (multiple)' : '') + ', beyond the Vela limit, so you explained the rule without diagnosing and reported to the SV.')); }, 'passenger/1-6');
    else note('bad', function () { return tx(L('搭乗できない判断は合っていましたが、理由が違いました（' + (t === 'cert' ? '週数は制限内で、診断書の発行日が古いことが理由' : '診断書ではなく、週数の制限が理由') + '）。お客様への案内も変わります。', '탑승할 수 없다는 판단은 맞았지만 이유가 달랐습니다(' + (t === 'cert' ? '주수는 제한 안이고 소견서 발급일이 오래된 것이 이유' : '소견서가 아니라 주수 제한이 이유') + '). 승객 안내도 달라집니다.', 'Holding was right, but for the wrong reason (' + (t === 'cert' ? 'the weeks were within the limit; the certificate was too old' : 'it was the week limit, not the certificate') + '). What you tell the passenger changes too.')); }, 'passenger/1-6', 'preg-wrong');
    sfx.ok(); endPax(true);
  }

  /* D3-05 가족 3명: 동반자 여권 확인 + 좌석은 아이를 보호자 옆에 */
  function supFam(c, p) {
    var s = c.sup;
    var h = '<div class="h3">' + esc(tx(L('ご家族（同じ予約・3名）', '가족(같은 예약·3명)', 'Family (one booking, 3 people)'))) + '</div>';
    h += '<p class="small">' + esc(tx(L('同行者の旅券も一人ずつ、写真と本人・有効期限・予約の名前を確認します。座席は、お子様（6歳）を保護者の隣にします。', '동행자 여권도 한 명씩 사진과 본인·유효기간·예약 이름을 확인합니다. 좌석은 어린이(6세)를 보호자 옆에 배정합니다.', 'Check each companion\'s passport too: photo and person, expiry, name on the booking. Seat the child (6) next to a parent.'))) + '</p>';
    if (s.party) h += p.party.map(function (m) { return '<div class="pp" style="margin-top:6px"><div class="t">PASSPORT · ' + m.nat + '</div><div class="ph">' + STG.portrait({ photo: m.photo }) + '</div><div>' + m.sur + ' ' + m.given + '<br>DOB ' + m.dob + '<br>Exp <b>' + m.exp + '</b><br>PNR ' + m.sur + '/' + m.given + ' ✓</div></div>'; }).join('');
    h += supRow(s.party, L('同行者2名の旅券を確認する', '동행자 2명의 여권 확인', 'Check the two companions\' passports'), 'fp', L('確認する', '확인하기', 'Check'));
    scr(h);
    if ($('#fp')) $('#fp').onclick = function () { if (c.bp) return; s.party = true; addTime(1.2); sfx.tap(); tabSup(); renderTabs(); };
  }
  /* 가족 좌석: 아버지 → 어머니 → 아이 순으로 3석 */
  function famNames(p) { return [p.pp.sur + ' ' + p.pp.given].concat(p.party.map(function (m) { return m.sur + ' ' + m.given + (m.role === 'child' ? ' (6)' : ''); })); }
  function famPick(id) {
    var c = S.cur, p = c.p, fs = c.famSeats || (c.famSeats = []);
    if (c.bp) return;
    if (fs.length >= 3) return;
    fs.push(id); S.seats.push(id); addTime(.3); sfx.tap();
    if (fs.length === 3) {
      c.seat = fs[0]; var child = fs[2], adj = nextTo(child), ok = adj.indexOf(fs[0]) >= 0 || adj.indexOf(fs[1]) >= 0;
      var all = blockOf(fs[0]) === blockOf(fs[1]) && blockOf(fs[1]) === blockOf(child);
      c.seatGood = ok; c.flags.famApart = !ok; mood(ok ? (all ? 6 : 3) : -14);
      say('me', D.seatConfirm); say('pax', ok ? p.say.seatOk : L('えっ、娘がひとりの席になるんですか…？', '네? 딸이 혼자 앉게 되나요…?', 'What, our daughter would sit on her own…?'));
    }
    tabSeat(); renderTabs();
  }
  function famReset() { var c = S.cur; if (c.bp) return; (c.famSeats || []).forEach(function (x) { var i = S.seats.indexOf(x); if (i >= 0) S.seats.splice(i, 1); }); c.famSeats = []; c.seat = null; c.seatGood = false; c.flags.famApart = false; addTime(.2); tabSeat(); renderTabs(); }
  /* 24차(사용자 요청): 비상구 좌석 — 구두 동의 뒤 안내문에 서명을 받고 배정. 서명 없이 구두 동의만으로 배정하면 Vela 교육용 규정 위반(업무 감점, 안전 미스는 아님) */
  function exitSignModal(id, redraw) {
    var c = S.cur, p = c.p; if (!redraw) say('me', D.exitSign); STG.pose('explain');
    var card = '<div class="exitcard"><b>' + esc(tx(L('非常口座席のご案内', '비상구 좌석 안내', 'Exit row information'))) + '</b> <span class="small mono">VELA AIR · ' + id + '</span><ul>' +
      [L('15歳以上であること', '15세 이상일 것', 'You are 15 or older'), L('緊急時に乗務員の指示に従い、脱出を手伝えること', '비상시 승무원 지시에 따라 탈출을 도울 수 있을 것', 'You can follow crew instructions and help with an evacuation'), L('乗務員の案内（日本語・英語など）を理解できること', '승무원 안내(일본어·영어 등)를 이해할 수 있을 것', 'You understand crew instructions (Japanese, English, etc.)'), L('乳幼児・小児の同伴や、介助・ペットの同伴がないこと', '유아·소아 동반, 보조·반려동물 동반이 없을 것', 'You are not travelling with an infant, child, pet, or someone you assist'), L('手荷物は足元に置かず、上の棚に入れること', '짐은 발밑에 두지 않고 위 선반에 넣을 것', 'Bags go in the overhead bin, not at your feet')]
        .map(function (x) { return '<li>' + esc(tx(x)) + '</li>'; }).join('') + '</ul><div class="sigline"><span class="small">' + esc(tx(L('ご署名', '서명', 'Signature'))) + '</span><span class="sig">' + esc(p.pp.sur + ' ' + p.pp.given) + '</span></div></div>';
    var m = modal(L('非常口座席の案内文と署名', '비상구 좌석 안내문과 서명', 'Exit row card and signature'), id,
      L('同意をいただいたら、案内文を見せて内容を確認していただき、署名を受けてから割り当てます（Vela Air 教育用の規定）。', '동의를 받으면 안내문을 보여 드려 내용을 확인하시게 하고, 서명을 받은 뒤 배정합니다(Vela Air 교육용 규정).', 'Once they agree, show the card, let them read it, and get a signature before assigning (Vela Air training rule).'),
      [{ id: 'sign', t: L('案内文を見せて署名をいただき、割り当てる', '안내문을 보여 드리고 서명을 받아 배정한다', 'Show the card, get the signature, then assign'), s: L('約30秒', '약 30초', '~30 sec'), run: function () { if (!canEdit(c)) return; addTime(.5); setSeat(id, true); c.flags.exitOK = true; c.flags.exitSigned = true; if (c.flags.exitNoSign) act(c, 'exit-nosign', 'signed-before-issue'); note('good', function () { return tx(L('非常口座席の条件を確認し、同意と署名をいただいて割り当てました。', '비상구 좌석 조건을 확인하고 동의와 서명을 받아 배정했습니다.', 'You checked the exit row conditions and got consent and a signature.')); }, 'passenger/1-5'); } },
       /* 24차b(GPT 24-F02): 구두 동의만은 여기서 오답으로 확정하지 않음. 발권 때 「최종 좌석이 비상구인데 서명이 없을 때만」 exit-nosign. 발권 전에 서명을 받거나 일반 좌석으로 바꾸면 정정 이력 */
       { id: 'oral', t: L('口頭の同意だけで割り当てる', '구두 동의만으로 배정한다', 'Assign on spoken consent only'), s: L('規定では署名が必要', '규정상 서명이 필요', 'The rule needs a signature'), run: function () { if (!canEdit(c)) return; setSeat(id, true); c.flags.exitOK = true; if (!c.flags.exitSigned) { c.flags.exitNoSign = true; act(c, 'exit-nosign', 'assigned-oral-only'); } } },   /* 이미 서명을 받은 승객이면 그 서명이 유효 */
       { id: 'no', t: L('やめて別の席にする', '그만두고 다른 자리로', 'Cancel and pick another seat'), run: function () {} }],
      'passenger/1-5', function () { tabSeat(); renderTabs(); });
    var must = m && m.querySelector('.must'); if (must) must.insertAdjacentHTML('afterend', card);
    S.modalRedraw = function () { exitSignModal(id, true); };   /* 언어 전환 때 안내문까지 다시 그림(대사는 다시 말하지 않음) */
    return m;
  }
  /* 27차: 유아 동반·비상구 희망 — 직원의 설명(이유 + 빈 앞쪽 통로 좌석 2곳). 유아가 겹치지 않는 열(좌우 블록)·비상구·고장 좌석 제외 */
  function infSeatIdeas() {
    var ac = ACFT(), out = [];
    for (var r = 1; r <= ac.rows && out.length < 2; r++) {
      if (ac.exitRows.indexOf(r) >= 0) continue;
      ['C', 'D'].forEach(function (col) { var id = r + col; if (out.length >= 2 || (ac.inop || []).indexOf(id) >= 0 || S.seats.indexOf(id) >= 0 || infClash(id)) return; if (out.length && parseInt(out[0], 10) === r) return; out.push(id); });
    }
    return out;
  }
  function infantExitTalk(c) {
    var sv = infSeatIdeas();
    c.flags.exitExplained = true; c.flags.exitIdeas = sv.slice(); addTime(.5); mood(-2);
    note('info', function () { return tx(L('【自動案内】', '[자동 안내] ', '[Auto guidance] ')) + tx(L('幼児連れのお客様の非常口のご希望に、座れない理由を説明し、幼児連れが重ならない前方の通路側の空席（' + sv.join('・') + '）を具体的にご案内しました。', '유아 동반 승객의 비상구 희망에 앉을 수 없는 이유를 설명하고, 유아 동반이 겹치지 않는 앞쪽 통로 빈자리(' + sv.join('·') + ')를 구체적으로 안내했습니다.', 'You explained why the exit row was not possible and named specific free front aisle seats (' + sv.join(', ') + ') where infants do not overlap.')); }, 'passenger/1-5');
  }
  function infantExitSay(c) {
    var p = c.p, sv = c.flags.exitIdeas || [], a = sv[0] || '', b = sv[1] || sv[0] || ''; sfx.tap();
    var T1 = L('申し訳ございません。赤ちゃんをお連れのお客様は、非常口座席にはお座りいただけません。非常口のお席の方には、緊急時に脱出のお手伝いをお願いするためです。', '죄송합니다. 아기와 함께 여행하시는 고객님은 비상구 좌석에 앉으실 수 없습니다. 비상구 좌석 승객께는 비상시 탈출을 도와 달라고 부탁드리기 때문입니다.', 'I am sorry, passengers travelling with a baby cannot sit in an exit row: people there may be asked to help with an evacuation. ');
    var T2v = L('前方の通路側のお席はいかがでしょうか。お化粧室にも近く、赤ちゃんとご一緒でも動きやすいお席です。', '대신 앞쪽 통로 쪽 좌석은 어떠세요? 화장실과도 가깝고 아기와 함께 다니시기 편한 자리입니다.', 'How about an aisle seat near the front? It is close to the lavatory and easy to move around with your baby.');
    var T2 = sv.length ? L('前方の通路側、' + a + 'か' + b + 'はいかがでしょうか。お化粧室にも近く、赤ちゃんとご一緒でも動きやすいお席です。', '대신 앞쪽 통로 쪽 ' + a + ' 또는 ' + b + ' 좌석은 어떠세요? 화장실과도 가깝고 아기와 함께 다니시기 편한 자리입니다.', 'How about an aisle seat near the front, ' + a + ' or ' + b + '? It is close to the lavatory and easy to move around with your baby.') : T2v;
    function cat(x, y) { return { ja: x.ja + y.ja, ko: x.ko + ' ' + y.ko, en: x.en + y.en }; }
    say('me', cat(T1, T2), false, cat(T1, T2v));
    if (p.say.exitNoReply) setTimeout(function () { if (S.cur === c) say('pax', p.say.exitNoReply); }, 2600);
  }
  function exitReqBanned(p) { return p.pnr && p.pnr.req === 'exit' && (!!p.inf || exitBan(p)); }
  function explainExit(c, p) {
    if (c.flags.exitExplained) return; c.flags.exitExplained = true; addTime(.5); mood(-4); sfx.tap();
    say('me', p.inf ? D.exitNo : L('申し訳ございません。こちらは非常口座席のため、ご案内できません。ほかのお席をご案内いたします。', '죄송합니다. 이 좌석은 비상구 좌석이라 안내해 드릴 수 없습니다. 다른 좌석을 안내해 드리겠습니다.', 'I am sorry, this is an exit row seat, so I cannot offer it. Let me find you another seat.'));
    if (p.say.exitNoReply) setTimeout(function () { if (S.cur === c) say('pax', p.say.exitNoReply); }, 650);
    note('good', function () { return tx(L('非常口座席のご希望に、座れない理由を説明して近い条件の席を案内しました。', '비상구 좌석 희망에 앉을 수 없는 이유를 설명하고 조건이 비슷한 자리를 안내했습니다.', 'You explained why the exit row was not possible and offered a similar seat.')); }, 'passenger/1-5');
  }
  function exitBan(p) { return p.sup && ['wch', 'um', 'preg', 'fam', 'pet'].indexOf(p.sup.type) >= 0; }
  function exitBanModal(id) {
    var c = S.cur, p = c.p; sfx.ng(); say('me', L('申し訳ございません。こちらは非常口座席のため、ご案内できません。ほかのお席をご案内いたします。', '죄송합니다. 이 좌석은 비상구 좌석이라 안내해 드릴 수 없습니다. 다른 좌석을 안내해 드리겠습니다.', 'I am sorry, this is an exit row seat, so I cannot offer it. Let me find you another seat.'));
    var why = { wch: L('車いす・移動に介助が必要なお客様', '휠체어·이동 보조가 필요한 승객', 'passengers needing mobility help'), um: L('お一人で旅行するお子様（15歳未満）', '혼자 여행하는 어린이(15세 미만)', 'unaccompanied children (under 15)'), preg: L('妊娠中のお客様', '임산부 승객', 'pregnant passengers'), fam: L('お子様と、お子様連れのご家族', '어린이와 어린이 동반 가족', 'children and families travelling with them'), pet: L('ペットを連れたお客様（前の座席の下にケージを置けない）', '반려동물 동반 승객(앞 좌석 밑에 케이지를 둘 수 없음)', 'passengers with a pet (no under-seat space for the carrier)') }[p.sup.type];
    return modal(L('非常口座席には座れません', '비상구 좌석에 앉을 수 없습니다', 'Not allowed in an exit row'), id,
      { ja: '非常口座席のお客様は、緊急時に乗務員を手伝う役割があります。次のお客様は座れません：' + why.ja, ko: '비상구 좌석 승객은 비상시 승무원을 돕는 역할을 합니다. 다음 승객은 앉을 수 없습니다: ' + why.ko, en: 'Exit row passengers may have to help the crew in an emergency. Not eligible: ' + why.en },
      [{ t: L('理由を説明して、ほかの座席を案内する', '이유를 설명하고 다른 좌석을 안내한다', 'Explain why and offer another seat'), run: function () { if (!canEdit(c)) return; c.flags.exitExplained = true; note('good', function () { return tx(L('非常口座席の条件に合わないため割り当てず、理由を説明しました。', '비상구 좌석 조건에 맞지 않아 배정하지 않고 이유를 설명했습니다.', 'You did not give the exit row to an ineligible passenger and explained why.')); }, 'passenger/1-5'); } },
       { t: L('ご希望どおり非常口座席にする', '희망대로 비상구 좌석으로 한다', 'Give them the exit row as asked'), lock: L('できません：条件に合わないお客様は非常口座席に座れない', '할 수 없음: 조건에 맞지 않는 승객은 비상구 좌석에 앉을 수 없음', 'Not allowed: ineligible passengers cannot sit in exit rows') }],
      'passenger/1-5', function () { tabSeat(); });
  }
  /* Day 3 발권 전 확인(놓친 확인의 결과) */
  function d3Issue(c, p) {
    var t = p.sup && p.sup.type, s = c.sup;
    if (!t) return;
    if (t === 'wch' && s.reopen) { s.reopen = false; act(c, 'wch-recheck', 'change-window-closed-at-issue'); }
    Object.keys(c.fixTry || {}).forEach(function (code) { if (code === 'um-handover' && p.sup.blank && !s.filled) s.formBad = true; if (code === 'pet-docs' && p.sup.kind === 'docs') s.docsBad = true; if (code === 'preg-limit' && pregTruth(p.sup) !== 'ok') s.pregBad = true; });
    if (t === 'wch' && !s.arranged) c.notes = c.notes.filter(function (n) { return n.c !== 'wch-ok'; });
    if (t === 'wch' && !s.arranged) { act(c, 'wch-assist', s.arrCode ? 'cancelled-arrangement-then-issued' : 'issued-without-arrangement'); safetyMiss(c, L('車いすのお客様の介助を手配せずに発券', '휠체어 승객의 보조를 수배하지 않고 발권', 'Issued without arranging the wheelchair help'), 'wch-assist'); note('bad', function () { return tx(L('車いす・搭乗の介助を手配しませんでした。ゲートや機内で移動できず、安全な搭乗ができません。予約のSSRがあっても、カウンターで手配と到着地への連絡まで行います。', '휠체어·탑승 보조를 수배하지 않았습니다. 게이트나 기내에서 이동하지 못해 안전한 탑승이 어렵습니다. 예약에 SSR이 있어도 카운터에서 수배와 도착지 연락까지 합니다.', 'You did not arrange the wheelchair and boarding help. The passenger cannot get through the gate or into the aircraft safely. Even with the SSR booked, the counter arranges it and tells the arrival station.')); }, 'passenger/1-7', 'wch-assist'); }
    if (t === 'um' && (!s.guard || !s.form || !s.pouch || s.formBad)) { safetyMiss(c, L('UMの引き渡し情報が不十分なまま発券', 'UM 인계 정보가 불충분한 채 발권', 'Issued a UM with incomplete handover details'), 'um-handover'); act(c, 'um-handover', 'issued-incomplete-handover'); note('bad', function () { return tx(s.formBad ? L('申込書の到着地の引き取り人の連絡先が空欄のまま発券しました。到着地でお子様を確実に引き渡せません。', '신청서의 도착지 인수인 연락처가 빈 칸인 채 발권했습니다. 도착지에서 어린이를 확실히 인계할 수 없습니다.', 'You issued with the arrival receiver\'s phone number blank. The child cannot be handed over safely at arrival.') : L('保護者の確認・申込書の確認・署名とパウチを終えずに発券しました。UMは引き渡しの記録が命綱です。', '보호자 확인·신청서 확인·서명과 파우치를 끝내지 않고 발권했습니다. UM은 인계 기록이 생명줄입니다.', 'You issued before checking the guardian, the form and the signed pouch. For a UM, the handover record is the lifeline.')); }, 'passenger/1-7', 'um-handover'); }
    if (t === 'pet') {
      if (p.sup.kind === 'docs') { act(c, 'pet-docs', s.docsBad ? 'issued-without-quarantine-papers' : s.docs ? 'issued-unresolved' : 'issued-without-checking-papers'); note('bad', function () { return tx(L('ペットの検疫書類が足りないまま受け付けました。犬は到着地で受け入れられず、送り返しや係留になります（ご本人の入国条件とは別）。', '반려동물 검역 서류가 부족한 채 접수했습니다. 강아지는 도착지에서 받아들여지지 않고 반송·계류됩니다(본인 입국 조건과 별개).', 'You accepted the dog with quarantine papers missing. It will be refused at arrival, returned or held (separate from the passenger\'s own entry).')); }, 'passenger/1-8', 'pet-docs'); }
      else if (!s.docs || !s.w) note('bad', function () { return tx(L('ペットの重さ・検疫書類の確認を終えずに受け付けました。', '반려동물 무게·검역 서류 확인을 끝내지 않고 접수했습니다.', 'You accepted the pet without finishing the weight and quarantine checks.')); }, 'passenger/1-8', 'pet-check');
      if (p.sup.kind === 'over' && !s.w) note('bad', function () { return tx(L('ケージごとの重さを量らずに受け付けました。PETCの上限（8kg）を超えていたため、機内には入れられませんでした。', '케이지째 무게를 재지 않고 접수했습니다. PETC 상한(8kg)을 넘어 기내에 들일 수 없었습니다.', 'You accepted without weighing the carrier. It was over the PETC limit (8kg) and could not go in the cabin.')); }, 'passenger/1-8', 'petc-over');
      if (!s.fee) note('bad', function () { return tx(L('PETC料金をいただいていませんでした（無料手荷物とは別の料金）。', 'PETC 요금을 받지 않았습니다(무료 수하물과 별도 요금).', 'You did not collect the PETC fee (separate from the bag allowance).')); }, 'passenger/1-8', 'fee-pet');
    }
    if (t === 'preg' && (s.pregBad || !s.preg)) { var tr = pregTruth(p.sup); if (tr !== 'ok') { safetyMiss(c, L('妊娠週数の制限・診断書の条件を満たさないまま発券', '임신 주수 제한·소견서 조건을 충족하지 않은 채 발권', 'Issued outside the pregnancy limit or certificate rule'), 'preg-limit'); act(c, 'preg-limit', 'issued-outside-pregnancy-rule'); note('bad', function () { return tx(L('出産予定日から数えると、搭乗日は Vela の基準を' + (tr === 'cert' ? '満たす診断書がない時期' : '超える週数') + 'でした。お客様と赤ちゃんの安全のための基準です。自分で診断せず、規定に沿って保留・SVへ。', '분만 예정일로 계산하면 탑승일은 Vela 기준을 ' + (tr === 'cert' ? '충족하는 소견서가 없는 시기' : '넘는 주수') + '였습니다. 승객과 아기의 안전을 위한 기준입니다. 직접 진단하지 말고 규정에 따라 보류·SV로.', 'Counting from the due date, the travel day ' + (tr === 'cert' ? 'needed a valid certificate that was not there' : 'was beyond the Vela week limit') + '. The rule protects mother and baby: do not diagnose — hold and go to the SV.')); }, 'passenger/1-6', 'preg-limit'); }
      else if (!s.preg) note('bad', function () { return tx(L('妊娠中のお客様の週数・書類を確認せずに受け付けました（今回は基準内）。', '임산부 승객의 주수·서류를 확인하지 않고 접수했습니다(이번에는 기준 안).', 'You accepted without checking the weeks and papers (within the rule this time).')); }, 'passenger/1-6', 'preg-check'); }
    if (t === 'fam' && !s.party) { safetyMiss(c, L('同行者の旅券を確認せずに発券', '동행자 여권을 확인하지 않고 발권', 'Issued without checking the companions\' passports'), 'pp-check'); note('bad', function () { return tx(L('同行者2名の旅券を確認せずに発券しました。家族でも一人ずつ本人と書類を確認します。', '동행자 2명의 여권을 확인하지 않고 발권했습니다. 가족이라도 한 명씩 본인과 서류를 확인합니다.', 'You issued without checking the two companions\' passports. Even for a family, check each person and document.')); }, 'passenger/1-3', 'pp-check'); }
  }
  /* 배웅 때의 Day 3 기록 */
  function d3End(c, p, denied) {
    var t = p.sup && p.sup.type, s = c.sup, rr = R3();
    if (!t || denied) return;
    if (t === 'wch' && s.arranged && s.arrCode !== p.sup.need) c.notes = c.notes.filter(function (n) { return n.c !== 'wch-ok'; });
    if (t === 'wch' && s.arranged && s.arrCode !== p.sup.need) { var wk = wchKey(p, s.arrCode); note('bad', function () { return tx(L('ご本人のお話では ' + p.sup.need + ' でしたが、' + s.arrCode + ' で手配したままでした。' + (wk === 'wch-under' ? '階段のない搭乗（搭乗橋・リフト車）の準備が漏れ、ご本人が搭乗できなくなるおそれがあります。' : '必要以上の手配で、ご本人の希望とも違います。'), '본인 말씀으로는 ' + p.sup.need + '였는데 ' + s.arrCode + '로 수배한 채였습니다. ' + (wk === 'wch-under' ? '계단 없는 탑승(탑승교·리프트카) 준비가 빠져 본인이 탑승하지 못할 수 있습니다.' : '필요 이상의 수배로 본인 희망과도 다릅니다.'), 'From what the passenger said it was ' + p.sup.need + ', but the arrangement stayed at ' + s.arrCode + '. ' + (wk === 'wch-under' ? 'Step-free boarding (jet bridge or lift) is missed, and the passenger may be unable to board.' : 'More than needed, and not what the passenger wanted.'))); }, 'passenger/1-7', wk); }
    if (t === 'wch' && s.arranged && s.arrNoAsk) note('bad', function () { return tx(L('ご本人に伺う前に、見た目と予約のコードだけで手配しました。', '본인에게 여쭙기 전에 겉모습과 예약 코드만으로 수배했습니다.', 'You arranged it from appearance and the booking code before asking.')); }, 'passenger/1-7', 'wch-guess');
    if (t === 'um' && !s.stay) note('bad', function () { return tx(L('保護者に、出発まで空港に残っていただくようお願いしませんでした。欠航や引き返しのとき、お子様を引き取る人がいません。', '보호자에게 출발까지 공항에 남아 달라고 부탁하지 않았습니다. 결항이나 회항 때 어린이를 인수할 사람이 없습니다.', 'You did not ask the guardian to stay until departure. If the flight is cancelled or returns, nobody can collect the child.')); }, 'passenger/1-7', 'um-stay');
    if (t === 'um' && c.seat && rr.umSeats.indexOf(c.seat) < 0) note('bad', function () { return tx(L('UMの座席は Vela の指定（' + umRange().ja + '）にします。乗務員が見守りやすい席です。', 'UM 좌석은 Vela 지정(' + umRange().ko + ')으로 합니다. 승무원이 지켜보기 쉬운 자리입니다.', 'UM seats follow the Vela list (' + umRange().en + '), where the crew can keep an eye on the child.')); }, 'passenger/1-7', 'um-seat');
    if (t === 'pet' && c.seat && !s.avih && (!/[AF]/.test(c.seat.slice(-1)) || parseInt(c.seat, 10) === 1)) note('bad', function () { return tx(L('PETCのお客様の座席は窓側（1列目は不可）にします。ケージを前の座席の下に置き、ほかのお客様の通路をふさがないためです。', 'PETC 승객 좌석은 창가(1열 불가)로 합니다. 케이지를 앞 좌석 밑에 두고 다른 승객의 통로를 막지 않기 위해서입니다.', 'PETC passengers sit at a window (not row 1), with the carrier under the seat in front and the aisle clear.')); }, 'passenger/1-8', 'petc-seat');
    if (t === 'fam' && c.flags.famApart) note('bad', function () { return tx(L('6歳のお子様が保護者の隣になりませんでした。お子様は保護者のすぐ隣にします（緊急時の酸素マスクや避難の手助け）。', '6세 어린이가 보호자 옆이 아니었습니다. 어린이는 보호자 바로 옆에 앉힙니다(비상시 산소마스크·탈출 도움).', 'The 6-year-old was not next to a parent. Children sit right next to a parent (oxygen masks and evacuation in an emergency).')); }, 'passenger/1-5', 'fam-apart');
  }

  /* D3-06 마감 후 도착: 운항 이벤트(승객 수에는 넣지 않음) */
  function runLate() {
    S.lateDone = true; var lp = S.list.late, t = Math.max(S.clock, S.close + 5), ok1 = false; S.lateAt = t; updateBar();
    sfx.ng(); STG.pose('explain'); var pw = $('#paxwrap'); if (pw) { pw.style.transition = 'none'; pw.style.transform = 'translateX(0)'; pw.style.opacity = 1; } STG.bag(null); if ($('#scalelcd')) $('#scalelcd').textContent = '0.0'; STG.pax(lp, 45); STG.queue([]);
    var alt = V.alt.map(function (a) { return a.flight + ' ' + a.dep; }).join(' / ');
    function step2() {
      modal(L('次の便のご案内', '다음 편 안내', 'Offering the next flight'), alt,
        L('受け付けられない場合は、次の便の空席と変更の条件を調べて案内します。運賃の規則や手数料は自分で約束せず、SV・発券部門が確認します。', '접수할 수 없으면 다음 편 빈자리와 변경 조건을 알아보고 안내합니다. 운임 규정이나 수수료는 직접 약속하지 않고 SV·발권 부서가 확인합니다.', 'If you cannot accept the passenger, check seats on the next flights and the change conditions. Do not promise fares or fees yourself — the SV or ticketing confirms them.'),
        [{ t: L('次の便（' + alt + '）の空席を調べ、変更の条件（運賃規則・手数料はSV・発券で確認）をご案内する', '다음 편(' + alt + ') 빈자리를 알아보고 변경 조건(운임 규정·수수료는 SV·발권에서 확인)을 안내한다', 'Check seats on the next flights (' + alt + ') and explain the change conditions (fare rules and fees confirmed by the SV / ticketing)'),
          run: function () { evCheck('late-close', ok1); evNote('good', function () { return tx(L('次の便の空席と変更の条件を調べてご案内しました。', '다음 편 빈자리와 변경 조건을 알아보고 안내했습니다.', 'You checked the next flights and explained the change conditions.')); }, 'passenger/5-6'); } },
         { t: L('「手数料なしで変更できます」と約束して安心してもらう', '「수수료 없이 변경할 수 있습니다」라고 약속해 안심시킨다', 'Reassure the passenger: "you can change for free"'),
          run: function () { evCheck('late-close', false); evNote('bad', function () { return tx(L('権限のない「手数料なし」を約束しました。運賃の規則・手数料はSV・発券部門が確認します。', '권한 없는 「수수료 없음」을 약속했습니다. 운임 규정·수수료는 SV·발권 부서가 확인합니다.', 'You promised a free change without authority. Fare rules and fees are for the SV / ticketing to confirm.')); }, 'passenger/5-6', 'promise-fee'); } },
         { t: L('予約センターに電話するよう伝えて終える', '예약센터에 전화하라고 하고 끝낸다', 'Tell them to call reservations and leave it there'),
          run: function () { evCheck('late-close', false); evNote('bad', function () { return tx(L('次の便を調べずに予約センターへ回しました。カウンターで空席と条件を確かめて案内します。', '다음 편을 알아보지 않고 예약센터로 넘겼습니다. 카운터에서 빈자리와 조건을 확인해 안내합니다.', 'You passed the passenger to reservations without checking the next flights. Check seats and conditions at the counter.')); }, 'passenger/5-6', 'late-noalt'); } }],
        'passenger/5-6', function () { STG.pax(null); nextPax(); });
    }
    modal(L('締め切り後にお客様が到着しました', '마감 후 승객이 도착했습니다', 'A passenger arrives after the close'), hm(t) + ' · ' + V.flight + ' STD ' + V.std + ' · ETD ' + V.etdLate + ' (' + tx(L('到着機の遅れ', '도착 기재 지연', 'late inbound')) + ') · ' + tx(L('締切 ', '마감 ', 'Close ')) + V.close + ' — 「' + tx(L('すみません！まだ間に合いますか？', '죄송해요! 아직 늦지 않았나요?', 'Sorry! Am I still in time?')) + '」 ' + lp.pp.sur + ' ' + lp.pp.given,
      L('締め切り（Vela：出発60分前）を過ぎたら、カウンターでは受け付けません。ETDが少し遅れても締め切りは自動では延びません。受付を再開できるかは、運航の状況を知るSVが判断します。', '마감(Vela: 출발 60분 전)이 지나면 카운터에서는 접수하지 않습니다. ETD가 조금 늦어져도 마감은 자동으로 늘어나지 않습니다. 접수 재개 여부는 운항 상황을 아는 SV가 판단합니다.', 'After the close (Vela: 60 minutes before departure) the counter does not accept passengers. A slightly later ETD does not extend the close automatically. Whether check-in can reopen is the SV\'s call, as they know the operational picture.'),
      [{ t: L('締め切り後であることをお詫びして伝え、SVに受付を再開できるか（運航の状況）を確認する', '마감 후임을 사과하며 전하고 SV에게 접수 재개 가능 여부(운항 상황)를 확인한다', 'Apologise, explain check-in has closed and ask the SV whether it can reopen'), s: L('SVの回答：ロードシート確定・搭乗準備中のため再開不可', 'SV 답변: 로드시트 확정·탑승 준비 중이라 재개 불가', 'SV: the loadsheet is final and boarding is being prepared — no reopening'),
        run: function () { ok1 = true; S.evRep.need++; S.evRep.done++; evNote('good', function () { return tx(L('締め切り後のお客様にお詫びして事実を伝え、受付再開の可否をSVに確認しました（再開不可）。', '마감 후 도착한 승객에게 사과하고 사실을 전한 뒤 접수 재개 여부를 SV에게 확인했습니다(재개 불가).', 'You apologised to the late passenger, explained, and checked with the SV whether check-in could reopen (it could not).')); }, 'passenger/1-1'); } },
       { t: L('5分だけなので、受け付けてしまう', '5분뿐이니 접수해 버린다', 'It is only five minutes — accept the passenger'),
        run: function () { S.evRep.need++; evNote('bad', function () { return tx(L('締め切り後に自分の判断で受け付けようとし、SVに止められました。締め切り後は人数・手荷物・ロードシートが確定しているため、受付の再開はSVが判断します。', '마감 후 자기 판단으로 접수하려다 SV에게 제지당했습니다. 마감 후에는 인원·수하물·로드시트가 확정되어 있어 접수 재개는 SV가 판단합니다.', 'You tried to accept the passenger after the close on your own and the SV stopped you. After the close the numbers, bags and loadsheet are final; reopening is the SV\'s call.')); }, 'passenger/1-1', 'late-accept'); } },
       { t: L('出発が15分遅れる見込みなので、締め切りも延びたことにして受け付ける', '출발이 15분 늦어질 예정이니 마감도 늘어난 것으로 보고 접수한다', 'Departure is 15 minutes late, so treat the close as extended and accept'),
        run: function () { S.evRep.need++; evNote('bad', function () { return tx(L('ETDが遅れても締め切りは自動では延びません。延長はSVが運航の状況を見て決めます（今回は延長なし）。', 'ETD가 늦어져도 마감은 자동으로 늘어나지 않습니다. 연장은 SV가 운항 상황을 보고 정합니다(이번에는 연장 없음).', 'A later ETD does not extend the close. Only the SV can extend it, based on the operation (no extension this time).')); }, 'passenger/1-1', 'late-etd'); } },
       { t: L('「締め切りました」とだけ伝えて、お帰りいただく', '「마감되었습니다」라고만 전하고 돌려보낸다', 'Just say "check-in is closed" and send them away'),
        run: function () { S.evRep.need++; evCheck('late-close', false); evNote('bad', function () { return tx(L('締め切りを伝えただけで、SVへの確認も次の便の案内もしませんでした。', '마감만 전하고 SV 확인도 다음 편 안내도 하지 않았습니다.', 'You only said it was closed — no SV check and no next flight offered.')); }, 'passenger/5-6', 'late-noalt'); } }],
      'passenger/1-1', function () { if (S.evRec && S.evRec.notes.some(function (n) { return n.c === 'late-noalt'; }) && S.evChecks.some(function (x) { return x.id === 'late-close'; })) { STG.pax(null); return nextPax(); } step2(); });
  }

  /* ---------- 판단 모달 ---------- */
  function openModalShell(title, html) {
    $('#modal').innerHTML = '<div class="modal"><div class="card" role="dialog" aria-modal="true" tabindex="-1"><h2>' + esc(tx(title)) + '</h2><div class="cbody">' + html + '</div></div></div>';
    var cd = $('#modal .card'); modalInert(); try { if (cd && (!document.activeElement || !cd.contains(document.activeElement))) cd.focus({ preventScroll: true }); } catch (e) {}
    return cd;
  }
  function closeModal() { if (S) S.modalRedraw = null; var md = $('#modal'); if (md) md.innerHTML = ''; modalInert(); if (G.screen === 'play') STG.pose('idle'); }
  /* 24차b(GPT 24-F03): 대화창이 열려 있는 동안 뒤쪽 근무 화면(장면·단말)은 inert. 위 막대(음성·✕ 그만두기)는 원래 창 위에서도 누를 수 있으므로 그대로 둠 — Tab·Enter로 뒤쪽 탭·발행을 누를 수 없음. 창이 닫히면 되돌림.
     창을 지우는 곳이 여러 군데라, #modal 안이 바뀔 때마다 다시 계산(MutationObserver) */
  function modalInert() { var md = $('#modal'), on = !!(md && md.children.length); ['#app > .main'].forEach(function (q) { var el = document.querySelector(q); if (el) { el.inert = on; if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert'); } }); }
  /* 28차(GPT 27차 의견): Day 4·5(평가 단계)의 응대 선택지는 정답 위치를 외우지 않도록 seed·승객·질문별로 섞음. 같은 판·같은 질문은 늘 같은 순서(언어를 바꿔도 그대로, 이어하기 뒤에도 같음). Day 1–3은 고정 */
  function shufOpts(opts, key) {
    if (!S || !S.day || S.day.n < 4) return opts;
    var r = DY.rng(((S.seed | 0) ^ parseInt(fnv(key + '|' + (S.cur ? S.cur.p.id : '')), 16)) | 0), a = opts.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function modal(title, fact, must, opts, lesson, after) {
    var h = '<div class="mhead">' + (S && S.cur && STG.has(S.cur.p.art) ? STG.mini(S.cur.p) : '') + '<p class="mono" style="font-size:13px;color:var(--sub);margin:0">' + esc(fact) + '</p></div><div class="must">' + STG.mascot('korarin', 'idle', 'km') + '<div><b>' + esc(tx(T.rule)) + '</b> ' + esc(tx(must)) + '</div></div>';
    h += opts.map(function (o, i) {
      var lock = o.lock;
      return '<button class="opt' + (lock ? ' lock' : '') + '" data-i="' + i + '"' + (o.good ? ' data-a="ok"' : o.code ? ' data-a="' + esc(o.code) + '"' : '') + '>' + (lock ? '🔒 ' : '') + esc(tx(o.t)) + (o.s ? '<small>' + esc(tx(o.s)) + '</small>' : '') + '</button>';
    }).join('');
    h += '<div id="whybox"></div>';
    if (lesson && LS[lesson]) h += '<p class="lessonref">' + lessonA(lesson, '📘 ' + lesson + ' ' + (tx(LS[lesson]) || LS[lesson].ja)) + '</p>';
    var card = openModalShell(title, h); STG.pose('explain'); var own = S && S.cur;
    var args = arguments; S.modalRedraw = function () { modal.apply(null, args); };
    card.querySelectorAll('.opt').forEach(function (b) {
      b.onclick = function () {
        var o = opts[+b.dataset.i];
        if (own && (S.cur !== own || G.screen !== 'play')) { closeModal(); return; }   /* 25차(24b-R02): 잠긴 선택지도 승객·화면을 먼저 확인 */
        if (o.lock) { sfx.ng(); $('#whybox').innerHTML = '<div class="why bad">' + esc(tx(o.lock)) + '</div>'; if (S.cur) note('info', function () { return tx(L('できない選択を試みました：', '할 수 없는 선택을 시도했습니다: ', 'Tried a choice that is not allowed: ')) + tx(o.t); }, lesson); return; }
        if (own && (S.cur !== own || G.screen !== 'play')) { closeModal(); return; }   /* 24차b(GPT 24-F03)·25차(24b-R02): 창을 연 승객이 바뀌었거나 근무 화면을 떠났으면 아무것도 하지 않음(뒤처리 after도 하지 않음) */
        sfx.ok(); closeModal(); if (o.run) o.run(); if (after) after();
      };
    });
    return card;
  }

  /* ---------- 결과 ---------- */
  /* 27차(GPT 26-F03): 결과를 만들다 오류가 나면 기록·진행본은 건드리지 않고 안내(손상본의 마지막 방어선) */
  function finish() {
    var pr; try { pr = finishInner(); } catch (e) { return finishErr(e); }
    if (pr && pr.then) pr.then(null, finishErr);
  }
  function finishErr(e) {
    {
      try { console.error(e); } catch (x) {}
      G.screen = 'result'; playCls();
      $('#app').innerHTML = '<div class="res"><div class="panel"><h2>' + esc(tx(L('結果を作れませんでした', '결과를 만들 수 없습니다', 'Could not build the results'))) + '</h2><p>' + esc(tx(S && S.hrec && !S.blocked && S.saveOk !== false && !S.testStopped ? L('結果の画面を表示できませんでした。学習の記録は保存されています。', '결과 화면을 표시하지 못했습니다. 학습 기록은 저장되었습니다.', 'The results screen could not be shown. Your record was saved.') : L('勤務のデータに問題があるため、結果を表示できません。学習の記録と保存された勤務は変更していません。', '근무 데이터에 문제가 있어 결과를 표시할 수 없습니다. 학습 기록과 저장된 근무는 바꾸지 않았습니다.', 'The shift data has a problem, so the results cannot be shown. Your record and the saved shift were not changed.'))) + '</p><div class="btns"><button class="start" id="home" style="width:auto">' + esc(tx(L('勤務日の選択へ', '근무일 선택으로', 'Back to shift select'))) + '</button></div></div></div>';
      $('#home').onclick = renderTitle;
    }
  }
  /* 27차(GPT 26-F01): 이 탭이 지금 이 판의 주인인지(최종 기록·진행본 삭제 직전 다시 확인). 주인 표시를 써서 다시 읽어 확인(창 사이의 틈을 줄임) */
  function finalOwner() {
    if (!S.runId) return true;
    if (S.noSave === 'conflict') return false;
    var o = readRun();
    if (!o) return !(S.rev > 0);   /* 한 번도 저장 못 한 판(저장소 오류)만 주인으로 봄 */
    if (o.err || o.runId !== S.runId || o.owner !== S.tabTok || (o.rev || 0) !== (S.rev || 0)) return false;
    try { o.fin = S.tabTok; localStorage.setItem(RKEY, JSON.stringify(o)); var o2 = readRun(); return !!(o2 && o2.runId === S.runId && o2.owner === S.tabTok && o2.fin === S.tabTok); } catch (e) { return true; }
  }
  function finishInner() {
    if (S.cur && S.results.indexOf(S.cur) < 0) S.results.push(S.cur);
    if (S.delay && !S.dlChecked) { S.dlChecked = true; evCheck('delay-notice', S.results.filter(function (r) { return !r.denied; }).every(function (r) { return r.delayTold; })); }
    var unserved = S.list.length - S.results.length, allR = S.results.concat(S.evRec ? [S.evRec] : []);
    var bad = 0, good = 0, moods = [];
    allR.forEach(function (r) { r.notes.forEach(function (n) { if (n.t === 'bad') bad++; if (n.t === 'good') good++; }); if (!r.denied && !r.ev) moods.push(r.mood); });
    var acc = Math.max(0, 100 - bad * 12 - unserved * 15);
    var svc = Math.round(moods.reduce(function (a, b) { return a + b; }, 0) / Math.max(1, moods.length));
    var left = S.close - S.clock, tim = unserved ? Math.max(0, 40 - unserved * 10) : Math.round(Math.max(0, Math.min(100, 70 + left * 4)));
    var tot = Math.round(acc * .4 + svc * .3 + tim * .3);
    var safe = S.strikes === 0, smiss = (S.safety || []);
    /* Day 2~ 채점(합의본 v3): 정확25·안전25·만족15·시간10·요금5·보고10·이벤트10, 해당 없는 항목은 빼고 정규화 */
    var parts = null;
    if (S.adv) {
      var badAcc = 0, feeErr = 0, feeCases = 0, need = 0, done = 0;
      allR.forEach(function (r) {
        r.notes.forEach(function (n) { if (n.t !== 'bad') return; if (/^fee-/.test(n.c || '')) feeErr++; else if (['sv-miss', 'gate-notify', 'dcs-nosync', 'dcs-wait', 'delay-vague', 'delay-stop', 'ob-ignore', 'ob-protect', 'ob-novol'].indexOf(n.c) < 0) badAcc++; });
        if (has(r.p, 'golf') || has(r.p, 'overweight') || (r.p.sup && r.p.sup.type === 'pet' && !r.denied) || (r.p.bags || []).some(function (b) { return b.mob; })) feeCases++;
        if (r.needSV) { need++; if (r.svDone) done++; }
      });
      acc = Math.max(0, 100 - badAcc * 10 - unserved * 15);
      parts = [{ k: 'acc', v: acc, w: 25 }, { k: 'safe', v: safe ? 100 : 0, w: 25 }, { k: 'svc', v: svc, w: 15 }, { k: 'tim', v: tim, w: 10 }];
      if (feeCases) parts.push({ k: 'fee', v: Math.max(0, 100 - feeErr * 50), w: 5 });
      need += S.evRep.need; done += S.evRep.done;
      if (need) parts.push({ k: 'rep', v: Math.round(100 * done / need), w: 10 });
      if (S.evChecks.length) parts.push({ k: 'evt', v: Math.round(100 * S.evChecks.filter(function (x) { return x.ok; }).length / S.evChecks.length), w: 10 });
      var ws = parts.reduce(function (a, x) { return a + x.w; }, 0);
      tot = Math.round(parts.reduce(function (a, x) { return a + x.v * x.w; }, 0) / ws);
    }
    var rank = !safe ? 'C' : tot >= 90 ? 'S' : tot >= 80 ? 'A' : tot >= 65 ? 'B' : 'C';
    /* 업무 합격(합의본 v3 §8, 2026-10-11): 안전 누락과 별도로, 중대한 업무 오류가 미해결로 남으면 최고 등급 A */
    var OPS = ['conn-miss', 'ob-noconsent', 'pet-docs', 'fam-apart', 'wch-under'], opMiss = [];
    allR.forEach(function (r) { r.notes.forEach(function (n) { if (n.t === 'bad' && OPS.indexOf(n.c) >= 0 && opMiss.indexOf(n.c) < 0) opMiss.push(n.c); }); });
    var opsPass = !opMiss.length, opCapped = safe && !opsPass && rank === 'S'; if (opCapped) rank = 'A';
    var capped = S.day.n >= 2 && G.hints && !G.practice && rank === 'S'; if (capped) rank = 'A';
    /* 28차(GPT 27-F02): 기록 직전 점수 범위 확인 — 구성 점수·총점·승객 만족·시간이 0~100(시간은 0~240분)이 아니면 기록·진행본을 바꾸지 않고 오류 안내(finish의 catch) */
    function in100(x) { return typeof x === 'number' && isFinite(x) && x >= 0 && x <= 100; }
    if (![tot, acc, svc, tim].every(in100) || (parts && !parts.every(function (x) { return in100(x.v); })) || !allR.every(function (r) { return (r.ev || r.denied || in100(r.mood)) && typeof r.mins === 'number' && r.mins >= 0 && r.mins <= 240; })) throw new Error('score-range');
    G.best = G.best || {}; var key = 'pax.ci.01.' + G.country; if (S.day.n === 1 && (!G.best[key] || G.best[key] < tot)) G.best[key] = tot;
    /* 27차(GPT 26-F03): 결과 표시에 필요한 계산을 기록보다 먼저 — 여기서 오류가 나면 기록·진행본을 바꾸지 않음 */
    var rev = S.revenue.map(function (r) { return r.pax + ' ' + r.what + ' ' + (r.cur === 'JPY' ? '¥' : '₩') + r.amt.toLocaleString(); });
    var rp = allR.map(function (r) {
      var p = r.p;
      if (r.ev) return '<div class="rp"><h3>' + esc(tx(L('運航イベント（SV・運航情報）', '운항 이벤트(SV·운항 정보)', 'Operational events (SV, ops information)'))) + '</h3><ul>' + r.notes.map(function (n) { return '<li class="' + (n.t === 'bad' ? 'bad' : n.t === 'good' ? 'good' : '') + '">' + esc(noteText(n)) + (n.l && LS[n.l] ? ' ' + lessonA(n.l, '📘 ' + n.l, 'lessonref') : '') + '</li>'; }).join('') + '</ul></div>';
      return '<div class="rp"><h3>' + p.pp.sur + ' ' + p.pp.given + ' <span style="font-weight:400;color:var(--sub);font-size:12px">' + (r.denied ? tx(L('搭乗お断り', '탑승 거절', 'Not accepted')) : (r.seat || '—')) + ' · ' + tx(L('満足', '만족', 'Mood')) + ' ' + Math.round(r.mood) + ' · ' + r.mins.toFixed(1) + tx(T.min) + '</span></h3><ul>' +
        (r.notes.length ? r.notes.map(function (n) { return '<li class="' + (n.t === 'bad' ? 'bad' : n.t === 'good' ? 'good' : '') + '">' + esc(noteText(n)) + (n.l && LS[n.l] ? ' ' + lessonA(n.l, '📘 ' + n.l, 'lessonref') : '') + '</li>'; }).join('') : '<li>' + esc(tx(L('記録なし', '기록 없음', 'No notes'))) + '</li>') + '</ul></div>';
    }).join('');
    /* 28차(GPT 27-F01): 기록은 잠금 안의 commitRec 하나로 — 최신 진행본·학습 기록 다시 읽기 → runId·소유권 확인 → 기록 저장 → 진행본 삭제. 화면은 그 뒤에 그림 */
    var me = S;
    function commitRec() {
    /* 학습 이력: 한 판에 한 번만 기록(언어 전환으로 결과를 다시 그려도 중복되지 않게) */
    /* 26차(R25-03): 같은 판(runId)은 한 번만 기록. 다른 창이 쓴 기록을 덮지 않도록 기록 직전에 저장소를 다시 읽음 */
    if (!S.hrec && S.runId) { G.store = DY.loadStore(); G.hist = G.store.days; if ((G.store.doneRuns || []).indexOf(S.runId) >= 0) { S.dupRun = true; S.blocked = true;   /* 다른 탭이 이미 이 판을 끝냄 */ S.hrec = G.hist[DY.key(S.day, G.country) + (G.practice ? '.practice' : '')] || { plays: 0, miss: {} }; clearRunNow(S.runId, S.tabTok); } }
    if (!S.hrec && S.runId && !finalOwner()) { S.blocked = true; S.hrec = G.hist[DY.key(S.day, G.country) + (G.practice ? '.practice' : '')] || { plays: 0, miss: {} }; }   /* 다른 탭이 이어받은 판: 기록·진행본 그대로 */
    if (window.SAGA_TEST && window.__sagaStop === 'beforeHist' && !S.hrec) { S.hrec = { plays: 0, miss: {} }; S.testStopped = true; }
    if (!S.hrec) {
      /* 기록용 오답 구조: 승객·사례 코드·이유 키·행동·심각도(critical / minor / report / self-corrected). 같은 승객의 같은 코드는 1번만 */
      var crit = {}; (S.safety || []).forEach(function (x) { if (x.code) crit[x.who + '|' + x.code] = true; });
      var mistakes = [], seen = {};
      allR.forEach(function (r) {
        var who = r.p.pp.sur + ' ' + r.p.pp.given;
        r.notes.forEach(function (n) { if (n.t !== 'bad') return; var code = n.c || n.l; if (!code || seen[r.p.id + '|' + code]) return; seen[r.p.id + '|' + code] = true;
          var m = { paxId: r.p.id, caseCode: code, reasonKey: 'reason.' + code, action: ACT[code] || 'see-note', severity: crit[who + '|' + code] ? 'critical' : (code === 'sv-miss' || code === 'gate-notify') ? 'report' : 'minor' };
          if (OPS.indexOf(code) >= 0) m.opsMajor = true; if (r.acts && r.acts[code]) m.actionHistory = r.acts[code].slice(); mistakes.push(m); });
        (r.selfFix || []).forEach(function (code) { if (seen[r.p.id + '|' + code]) return; seen[r.p.id + '|' + code] = true; var m = { paxId: r.p.id, caseCode: code, reasonKey: 'reason.' + code, action: 'corrected-before-issue', severity: 'self-corrected' }; if (r.acts && r.acts[code]) m.actionHistory = r.acts[code].slice(); mistakes.push(m); });
      });
      S.mistakes = mistakes;
      var miss = []; mistakes.forEach(function (m) { if (m.severity !== 'self-corrected' && miss.indexOf(m.caseCode) < 0) miss.push(m.caseCode); });
      var at = new Date().toISOString();
      S.hrec = DY.record(G.hist, S.day, G.country, { scoreVer: 'full7', tot: tot, rank: rank, safe: safe, ops: opsPass, hints: !!G.hints, complete: unserved === 0, practice: !!G.practice, miss: miss, at: at.slice(0, 10) });
      DY.addAttempt(G.store, { attemptId: at + '-' + Math.floor(Math.random() * 1e6), runId: S.runId || null, day: S.day.n, workplace: G.country, mode: G.practice ? 'practice' : 'campaign', seed: S.seed, score: tot, rank: rank, safetyPassed: safe, complete: unserved === 0, hintsUsed: !!G.hints, opsPassed: opsPass, ruleVersion: '2026-10-11', scoreVersion: 'full7', aircraftLayoutVersion: 'A', mistakes: mistakes, completedAt: at });
      if (S.runId) G.store.doneRuns = [S.runId].concat((G.store.doneRuns || []).filter(function (x) { return x !== S.runId; })).slice(0, 50);
      S.saveOk = saveHist();
      /* 기록이 저장된 뒤에만 진행본을 지움(실패하면 남겨 두어 다시 이어서 끝낼 수 있음) */
      if (S.saveOk !== false && !(window.SAGA_TEST && window.__sagaStop === 'afterHist')) clearRunNow(S.runId, S.tabTok); }
    }
    return storeOp(function () { if (S === me && !S.hrec) commitRec(); }).then(function () { if (S === me) renderRes(); });
    function renderRes() {
    save(); var hr = S.hrec, tm = DY.topMiss(hr, 3);
    var histP = '<div class="panel"><h2>' + esc(tx(L('学習の記録', '학습 기록', 'Your record'))) + ' · DAY ' + S.day.n + ' ' + esc(tx(S.day.nm)) + (G.practice ? ' · ' + esc(tx(L('練習', '연습', 'Practice'))) : '') + '</h2>' +
      (S.clock > S.close && !unserved ? '<p class="small" style="margin:0 0 6px">' + esc(tx(L('締切前に受け付けたお客様は、締切後も手続きを完了しました（締切後は新しく受け付けません）。', '마감 전에 접수한 승객은 마감 후에도 수속을 끝까지 했습니다(마감 후에는 새로 접수하지 않음).', 'Passengers accepted before the close were completed after it (no new passengers after the close).'))) + '</p>' : '') +
      (S.lateAt ? '<p class="small" style="margin:0 0 6px">' + esc(tx(L('締め切り後に到着したお客様への対応（' + hm(S.lateAt) + '）は、時間の点数とは別の状況練習です（上の時刻は最後のお客様の手続きが終わった時刻）。', '마감 후 도착한 승객 응대(' + hm(S.lateAt) + ')는 시간 점수와 별개인 상황 연습입니다(위 시각은 마지막 승객 수속이 끝난 시각).', 'Handling the passenger who arrived after the close (' + hm(S.lateAt) + ') is a separate scenario, not part of the time score (the time above is when the last check-in finished).'))) + '</p>' : '') +
      (opCapped ? '<p class="small" style="margin:0 0 6px">' + esc(tx(L('業務上の大きな見落としが残ったため、ランクはAまでです。', '중대한 업무 오류가 남아 등급은 A까지입니다.', 'A serious operational error remained, so the rank is capped at A.'))) + '</p>' : '') +
      (capped ? '<p class="small" style="margin:0 0 6px">' + esc(tx(L('ヒントONのため、ランクはAまでです。', '힌트를 켜서 등급은 A까지입니다.', 'Tips were on, so the rank is capped at A.'))) + '</p>' : '') +
      (S.day.n === 1 && G.hints && !G.practice ? '<p class="small" style="margin:0 0 6px">' + esc(tx(L('DAY 1ははじめての勤務のため、ヒントONでもSまで認められます（DAY 2以降はAまで）。', 'DAY 1은 첫 근무라 힌트를 켜도 S까지 인정됩니다(DAY 2부터는 A까지).', 'DAY 1 is your first shift, so S is allowed even with tips on (from DAY 2, A at most).'))) + '</p>' : '') +
      (S.blocked ? '<p class="small" style="margin:0 0 6px;color:var(--ng,#c33)">' + esc(tx(L('この勤務は別の画面（タブ）で続けられているため、この画面の結果は学習の記録に残していません。', '이 근무는 다른 화면(탭)에서 이어서 진행되고 있어, 이 화면의 결과는 학습 기록에 남기지 않았습니다.', 'This shift is being continued in another window or tab, so these results were not added to your record.'))) + '</p>' : '') +
      (S.saveOk === false ? '<p class="small" style="margin:0 0 6px;color:var(--ng,#c33)">' + esc(tx(L('この端末に記録を保存できませんでした（プレイは続けられます）。', '이 기기에 기록을 저장하지 못했습니다(플레이는 계속할 수 있습니다).', 'Could not save your record on this device (you can keep playing).'))) + '</p>' : '') +
      (S.adv ? '<p class="small mono" style="margin:0 0 6px">SEED ' + S.seed + '</p>' : '') + '<p style="margin:0;font-size:14px">' +
      esc(tx(L('プレイ', '플레이', 'Plays'))) + ' ' + hr.plays + ' · ' + esc(tx(L('最高の回', '최고 회차', 'Best run'))) + ' ' + esc(bestText(hr, S.day.n) || '—') + '</p>' +
      '<p class="small" style="margin:2px 0 0">' + esc(tx(L('✔＝その回が安全合格 · 安全合格したことがある：', '✔ = 그 회차가 안전 합격 · 안전 합격 경험: ', '✔ = that run passed safety · Ever passed safety: '))) + (hr.safeEver ? '✔' : '—') + '</p>' +
      (tm.length ? '<p class="small" style="margin:8px 0 2px">' + esc(tx(L('見落としが多い項目', '자주 놓치는 항목', 'What you miss most'))) + '</p><ul class="tmiss">' + tm.map(function (m) { return '<li>' + esc(missLabel(m.code)) + ' <span class="small">×' + m.count + '</span></li>'; }).join('') + '</ul>' : '') + '</div>';
    G.screen = 'result'; playCls();
    $('#app').innerHTML = '<div class="res"><div class="panel reshead"><div class="twins">' + STG.mascot('koradon', rank === 'S' || rank === 'A' ? 'greet' : 'idle') + STG.mascot('korarin', rank === 'S' || rank === 'A' ? 'greet' : 'idle') + '</div><div class="rank">' + rank + '</div><div><h2 style="margin:0">' + esc(tx(L('チェックイン締め切り', '체크인 마감', 'Check-in closed'))) + ' · ' + V.flight + '</h2><div style="color:var(--sub);font-size:13px">' + hm(S.clock) + ' / ' + tx(L('締切', '마감', 'close')) + ' ' + V.close + ' · ' + tx(L('総合', '종합', 'Total')) + ' ' + tot + '</div></div></div>' +
      '<div class="gate ' + (safe ? 'ok' : 'ng') + '">' + esc(tx(safe ? L('安全・保安：合格 ― 安全に関わる見落としはありません。', '안전·보안: 합격 — 안전 관련 누락이 없습니다.', 'Safety & security: pass — no safety-related misses.') : L('安全・保安：要再訓練 ― 安全に関わる見落としは、ほかの点数で埋め合わせできません。', '안전·보안: 재훈련 필요 — 안전 관련 누락은 다른 점수로 메울 수 없습니다.', 'Safety & security: retraining needed — safety misses cannot be offset by other scores.'))) + (smiss.length ? '<ul class="smiss">' + smiss.map(function (x) { return '<li>' + esc(typeof x === 'string' ? x : x.who + ' — ' + tx(x.what)) + '</li>'; }).join('') + '</ul>' : '') + '</div>' +
      (S.day.n === 3 ? '<div class="gate ' + (opsPass ? 'ok' : 'ng') + '">' + esc(tx(opsPass ? L('業務：合格 ― 同伴・検疫・必要な介助など、お客様の旅程に関わる大きな見落としはありません。', '업무: 합격 — 동반·검역·필요한 보조 등 승객 여정에 관한 중대한 오류가 없습니다.', 'Operations: pass — no serious errors affecting companions, quarantine, assistance or the journey.') : L('業務：要確認 ― お客様の同伴・検疫・必要な介助など旅程に関わる大きな見落としが残りました（最高ランクはA）。', '업무: 확인 필요 — 동반·검역·필요한 보조 등 승객 여정에 관한 중대한 오류가 남았습니다(최고 등급 A).', 'Operations: needs work — a serious error affecting companions, quarantine, assistance or the journey remained (best rank A).'))) + (opMiss.length ? '<ul class="smiss">' + opMiss.map(function (c) { return '<li>' + esc(missLabel(c)) + '</li>'; }).join('') + '</ul>' : '') + '</div>' : '') +
      (S.day.n !== 3 && (S.delay || opMiss.length) ? '<div class="gate ' + (opsPass ? 'ok' : 'ng') + '">' + esc(tx(opsPass ? L('業務：合格 ― 乗り継ぎ・協力者の手続きに大きな見落としはありません。', '업무: 합격 — 연결편·협력자 처리에 중대한 오류가 없습니다.', 'Operations: pass — no serious errors in connections or volunteer handling.') : L('業務：要確認 ― お客様の旅程や同意に関わる大きな見落としが残りました（最高ランクはA）。', '업무: 확인 필요 — 승객의 여정이나 동의에 관한 중대한 오류가 남았습니다(최고 등급 A).', 'Operations: needs work — a serious error affecting the passenger\'s journey or consent remained (best rank A).'))) + (opMiss.length ? '<ul class="smiss">' + opMiss.map(function (c) { return '<li>' + esc(missLabel(c)) + '</li>'; }).join('') + '</ul>' : '') + '</div>' : '') +
      (parts ? '<div class="score">' + parts.map(function (x) { return '<div class="sc"><div class="v">' + x.v + '</div><div class="l">' + esc(tx({ acc: L('正確さ', '정확성', 'Accuracy'), safe: L('安全', '안전', 'Safety'), svc: L('お客様の満足', '승객 만족', 'Passenger mood'), tim: L('時間', '시간', 'Time'), fee: L('料金の処理', '요금 처리', 'Fees'), rep: L('報告・連絡', '보고·연락', 'Reporting'), evt: L('イベント対応', '이벤트 대응', 'Event handling') }[x.k])) + ' <span class="small">×' + x.w + '</span></div></div>'; }).join('') + '</div>' :
      '<div class="score"><div class="sc"><div class="v">' + acc + '</div><div class="l">' + esc(tx(L('正確さ', '정확성', 'Accuracy'))) + '</div></div><div class="sc"><div class="v">' + svc + '</div><div class="l">' + esc(tx(L('お客様の満足', '승객 만족', 'Passenger mood'))) + '</div></div><div class="sc"><div class="v">' + tim + '</div><div class="l">' + esc(tx(L('時間', '시간', 'Time'))) + '</div></div><div class="sc"><div class="v">' + (rev.length ? rev.length : 0) + '</div><div class="l">' + esc(tx(L('空港での収入（件）', '공항 수입(건)', 'Airport sales (items)'))) + '</div></div></div>') +
      (rev.length ? '<div class="panel"><h2>' + esc(tx(L('空港売上 ― 便の締めで精算します（次のステージへ）', '공항 매출 — 편 마감 때 정산합니다(다음 스테이지로)', 'Airport sales — settled when the flight closes (next stages)'))) + '</h2><p class="mono" style="margin:0">' + rev.join('<br>') + '</p></div>' : '') +
      (SITE ? '' : '<div class="seg" id="reslang" style="margin:0 0 4px">' + ['ja', 'ko', 'en'].map(function (l) { return '<button data-l="' + l + '" class="' + (G.lang === l ? 'on' : '') + '">' + { ja: '日本語', ko: '한국어', en: 'English' }[l] + '</button>'; }).join('') + '</div>') +
      resultNav(rank, safe, unserved, true) + histP + '<div class="panel"><h2>' + esc(tx(L('ふりかえり', '되돌아보기', 'Replay'))) + '</h2><div class="replay">' + rp + '</div></div>' +
      '<div class="panel"><h2>' + esc(tx(L('この便のデータは次へつながります', '이 편의 데이터는 다음으로 이어집니다', 'This flight\'s data carries on'))) + '</h2><p style="margin:0;font-size:14px">' + esc(tx(L('チェックインした人数・座席・手荷物の個数と重さは、ゲート（STAGE 02）とロードコントロール W&B（STAGE 03）の入力になります。', '체크인한 인원·좌석·수하물 개수와 무게는 게이트(STAGE 02)와 탑재관리 W&B(STAGE 03)의 입력이 됩니다.', 'Checked-in passengers, seats and bag counts and weights feed the Gate (STAGE 02) and Load Control W&B (STAGE 03).'))) + '</p>' +
      '<p class="mono" style="font-size:13px;margin:8px 0 0">PAX ' + S.results.reduce(function (a, r) { return a + (r.bp && !r.vol ? 1 + (r.p.party ? r.p.party.length : 0) : 0); }, 0) + (S.results.some(function (r) { return r.bp && r.p.inf; }) ? ' + INF ' + S.results.filter(function (r) { return r.bp && r.p.inf; }).length : '') + ' / BAGS ' + S.results.reduce(function (a, r) { return a + (r.vol ? 0 : r.bags.filter(function (b) { return b.tag; }).length); }, 0) + ' / ' + S.results.reduce(function (a, r) { return a + (r.vol ? 0 : r.bags.reduce(function (x, b) { return x + (b.tag ? b.w : 0); }, 0)); }, 0).toFixed(1) + ' KG' + (S.results.some(function (r) { return r.vol && r.bp; }) ? ' · ' + V.alt.flight + ' PAX ' + S.results.filter(function (r) { return r.vol && r.bp; }).length : '') + '</p></div>' +
      resultNav(rank, safe, unserved, false) + '</div>';
    document.querySelectorAll('[data-nav]').forEach(function (b) { b.onclick = { again: startMission, home: renderTitle, next: function () { G.day = S.day.n + 1; save(); startMission(); } }[b.dataset.nav]; });
    if ($('#reslang')) $('#reslang').onclick = function (e) { var b = e.target.closest('button[data-l]'); if (b) setLang(b.dataset.l); };
    topOfGame();
    }
  }

  /* INT-F02: 결과 뒤 「다음 날 근무」(주 버튼)·「오늘 복습」(별도). 다음 날은 같은 근무지의 캠페인 해금 상태로 판단(연습은 연습 안에서만 이동) */
  function resultNav(rank, safe, unserved, top) {
    var n = S.day.n, nx = DY.list[n], clearedNow = safe && unserved === 0 && ({ S: 4, A: 3, B: 2, C: 1 }[rank] || 0) >= 2;
    var nextOpen = nx && nx.mission && DY.status(G.hist, nx.n, G.country, G.practice) === 'open';
    var pr = G.practice ? ' · ' + tx(L('練習', '연습', 'practice')) : '';
    var bNext = nextOpen ? '<button class="start"' + (top ? ' id="nextday"' : '') + ' data-nav="next" style="width:auto">' + esc(tx(L('次の日の勤務へ', '다음 날 근무', "Next day's shift")) + pr + ' · DAY ' + nx.n + ' ' + tx(nx.nm)) + '</button>' : '';
    var bAgain = function (main) { return '<button class="start"' + (top ? ' id="again"' : '') + ' data-nav="again" style="width:auto' + (main ? '' : ';background:#3f7d8c') + '">' + esc(tx(L('今日の復習（もう一度）', '오늘 복습(다시 하기)', 'Review today (play again)')) + pr + ' · DAY ' + n) + '</button>'; };
    var bHome = '<button class="start"' + (top ? ' id="home"' : '') + ' data-nav="home" style="width:auto;background:#5d7480">' + esc(tx(L('勤務日の選択へ', '근무일 선택으로', 'Back to shift select'))) + '</button>';
    var msg = '', btns;
    if (!nx) { msg = clearedNow || G.practice ? L('チェックイン編の5日間をすべて終えました。気になる日を選んで復習できます。', '체크인편 5일을 모두 마쳤습니다. 원하는 날을 골라 복습할 수 있습니다.', 'You have finished all five days of the check-in chapter. Pick any day to review.') : L('DAY 5は、B以上・安全合格・すべてのお客様の手続き完了でクリアです。まず今日を復習しましょう。', 'DAY 5는 B 이상·안전 합격·모든 승객 처리로 클리어됩니다. 먼저 오늘을 복습해 보세요.', 'DAY 5 is cleared with B or better, a safety pass and every passenger handled. Review today first.'); btns = bAgain(true) + bHome; }
    else if (G.practice) btns = bNext + bAgain(false) + bHome;
    else if (clearedNow) btns = bNext + bAgain(false) + bHome;
    else { msg = nextOpen ? L('今回の勤務は、B以上・安全合格・すべてのお客様の手続き完了に届きませんでした。まず今日を復習しましょう（次の日はすでに開いています）。', '이번 근무는 B 이상·안전 합격·모든 승객 처리에 미치지 못했습니다. 먼저 오늘을 복습해 보세요(다음 날은 이미 열려 있습니다).', 'This shift did not reach B or better, a safety pass and every passenger handled. Review today first (the next day is already open).') : L('次の日は、同じ回でB以上・安全合格・すべてのお客様の手続き完了で開きます。まず今日を復習しましょう。', '다음 날은 한 번의 근무에서 B 이상·안전 합격·모든 승객 처리를 하면 열립니다. 먼저 오늘을 복습해 보세요.', 'The next day opens when one shift gets B or better, a safety pass and every passenger handled. Review today first.'); btns = bAgain(true) + bNext.replace('style="width:auto"', 'style="width:auto;background:#3f7d8c"') + bHome; }
    var inner = (msg ? '<p class="small"' + (top ? ' id="navmsg"' : '') + ' style="margin:0 0 6px">' + esc(tx(msg)) + '</p>' : '') + '<div class="btns"' + (top ? ' id="resnav"' : '') + ' style="margin-top:0">' + btns + '</div>';
    return top ? '<div class="panel resnavtop">' + inner + '</div>' : inner;
  }

  /* ---------- 시작 ---------- */
  /* 사이트(항공커리어노트) 안에서: 사이트 공통 언어 설정(art-lang)과 맞춤. 상단 언어 버튼(#lang)으로 바꾸면 화면을 다시 그림 */
  var SITE = !!window.__SHELL;
  function setLang(l) {
    if (['ja', 'ko', 'en'].indexOf(l) < 0) return;
    G.lang = l; document.documentElement.lang = l; save();
    try { localStorage.setItem('art-lang', l); } catch (e) {}
    var lb = document.getElementById('lang'); if (lb) lb.querySelectorAll('button[data-l]').forEach(function (b) { b.classList.toggle('on', b.dataset.l === l); });
    if (G.screen === 'title') renderTitle();
    else if (G.screen === 'play' && S && S.cur) { $('#gbar').innerHTML = barInner(); bindBar(); updateBar(); var mr = S.modalRedraw; renderTabs(); showTab(S.cur.tab); var b = S.bub || {}; if (b.me) say('me', b.me, true); if (b.pax) say('pax', b.pax, true); var gv = $('#guide'); if (S.guideL && gv && !gv.classList.contains('hide')) guide(S.guideL); if (mr) mr(); }
    else if (G.screen === 'play' && S && !S.cur && S.modalRedraw) { $('#gbar').innerHTML = barInner(); bindBar(); updateBar(); S.modalRedraw(); }
    else if (G.screen === 'result') finish();
  }
  /* 23차: 게임 홈의 Day 카드 → 게임주소#dayN. 그 날이 열려 있을 때만 고르고(잠긴 날은 안내만, 해금·연습 모드를 바꾸지 않음),
     바로 시작하지는 않음(음성은 사용자가 누른 뒤에만 켤 수 있음). 처리한 뒤 주소의 #dayN은 지워 새로고침 때 다시 적용되지 않게 함 */
  function applyHash() {
    var m = /^#day([1-9])$/i.exec(location.hash || ''); if (!m) return false;
    var n = +m[1], d = DY.list[n - 1];
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    if (!d) return false;
    var stt = DY.status(G.hist, n, G.country, G.practice);
    if (stt === 'open') { G.day = n; G.hintsByDay = G.hintsByDay || {}; save(); G.hashNote = { ok: true, n: n }; }
    else G.hashNote = { ok: false, n: n, soon: stt === 'soon' };
    return true;
  }
  function hashNoteHtml() {
    var h = G.hashNote; if (!h) return ''; G.hashNote = null;
    var t = h.ok ? L('DAY ' + h.n + ' を選びました。下の「出勤する」で始めます。', 'DAY ' + h.n + ' 선택 완료. 아래 「출근하기」로 시작합니다.', 'DAY ' + h.n + ' selected. Press Clock in below to begin.')
      : h.soon ? L('DAY ' + h.n + ' は準備中です。', 'DAY ' + h.n + ' — 준비 중입니다.', 'DAY ' + h.n + ' is coming soon.')
      : L('DAY ' + h.n + ' はまだ開いていません（前の日をB以上・安全合格で）。開いている日から始めます。', 'DAY ' + h.n + ' — 아직 열리지 않았습니다(앞의 날을 B 이상·안전 합격으로). 열린 날부터 시작합니다.', 'DAY ' + h.n + ' is still locked (clear the day before with B or better and a safety pass). You will start from an open day.');
    return '<p class="hashnote' + (h.ok ? '' : ' lock') + '" role="status">' + esc(tx(t)) + '</p>';
  }
  function boot() {
    STG.preload();
    var had = false; try { had = !!localStorage.getItem('acn-saga-v1'); } catch (e) {}
    load(); G.store = DY.loadStore(); G.hist = G.store.days;
    if (!had) { var nl = (navigator.language || 'ja').slice(0, 2); G.lang = nl === 'ko' ? 'ko' : nl === 'en' ? 'en' : 'ja'; }
    if (SITE) { try { var al = localStorage.getItem('art-lang'); if (['ja', 'ko', 'en'].indexOf(al) >= 0) G.lang = al; } catch (e) {} }
    var lb = document.getElementById('lang');
    if (lb) { lb.addEventListener('click', function (e) { var b = e.target.closest('button[data-l]'); if (b) setLang(b.dataset.l); }); lb.querySelectorAll('button[data-l]').forEach(function (b) { b.classList.toggle('on', b.dataset.l === G.lang); }); }
    document.documentElement.lang = G.lang;
    var hashed = applyHash();
    renderTitle();
    if (hashed) { var go = $('#go'); if (go && go.scrollIntoView) setTimeout(function () { go.scrollIntoView({ block: 'center' }); }, 60); }
    /* 27차(GPT 26-F01): 다른 탭이 같은 판을 이어받거나 지우거나 새 판을 시작하면 바로 알아차림 */
    window.addEventListener('storage', function (e) {
      if (e.key !== RKEY || !S || !S.runId || G.screen !== 'play' || S.noSave === 'conflict') return;
      var o = null; try { o = e.newValue ? JSON.parse(e.newValue) : null; } catch (x) {}
      if (o && o.runId === S.runId && (o.rev || 0) <= (S.rev || 0)) return;   /* 29차: 이 탭이 넘겨받기·저장하기 전에 쓰인 예전 알림(늦게 도착)은 무시 */
      if (!o || o.runId !== S.runId || o.owner !== S.tabTok) { S.noSave = 'conflict'; runWarn('conflict'); }
    });
    window.addEventListener('hashchange', function () { if (G.screen !== 'title') { if (/^#day/i.test(location.hash)) try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} return; } try { var d = JSON.parse(localStorage.getItem('acn-saga-v1') || '{}'); if (d.country) G.country = d.country; G.practice = !!d.practice; } catch (e) {} G.store = DY.loadStore(); G.hist = G.store.days; if (applyHash()) { renderTitle(); var go = $('#go'); if (go && go.scrollIntoView) go.scrollIntoView({ block: 'center' }); } });
  }
  window.SAGA = window.AS = { boot: boot, _S: function () { return S; }, _G: G, _setLang: function (l) { setLang(l); } };
  if (window.SAGA_TEST) AS._t = { flush: flushStore, hasLocks: hasLocks, startMission: function () { startMission(); }, beginMission: function () { beginMission(); }, nextPax: nextPax, showTab: showTab, renderTabs: renderTabs, issueBP: issueBP, setSeat: setSeat, endPax: endPax, saveRun: saveRun, readRun: readRun, checkRun: checkRun, resumeRun: resumeRun, runInfo: runInfo, finish: function () { finish(); } };   /* 23차: 화면 겹침 전수 점검(test/ui_sweep.py)용 — 시험 때만 */
  boot();
})();

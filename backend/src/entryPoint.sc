require: slotfilling/slotFilling.sc
  module = sys.zb-common

patterns:
    $AnyText = $nonEmptyGarbage

    # Паттерны для запуска сценария
    $OpenSkipWords = (хочу|мне|мое|моё|пожалуйста|в|прошу|тебя|может|с)
    $OpenKeyWords = (включи|включить|включай|запусти|запустить|запускай|играть|
        поиграть|поиграем|навык|игра|игру|скил|скилл|приложение|апп|сыграем|
        открой|поиграй со мной|сыграть|давай играть|активируй|давай|поиграем)
    $projectName = (Название вашего навыка)


theme: /
    state: Запуск
        # При запуске приложения с кнопки прилетит сообщение /start.
        q!: $regex</start>

        # При запуске приложения с голоса прилетит сказанная фраза.
        q!: [$repeat<$OpenSkipWords>]
            $repeat<$OpenKeyWords>
            [$repeat<$OpenSkipWords>]
            $projectName
        script:
            log($jsapi.cailaService.getCurrentClassifierToken());
            $temp.appeal = $request.rawRequest.payload.character.appeal;

        if: $temp.appeal == "official"
            a: Это попыт! Тыкайте на пупырки и наслаждайтесь.
        elseif: $temp.appeal == "no_official"
            a: Это попыт! Тыкай на пупырки и наслаждайся.
        else:
            a: Это попыт! Клик на пупырки дает райское наслаждение.

        buttons:
            "Начать"

    state: Fallback
        event!: noMatch
        a: Я не понимаю.

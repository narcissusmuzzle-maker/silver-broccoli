// Служба «будильник»: запускается системой в момент окончания таймера, даже если экран погашен и приложение закрыто.
// Делает две вещи: вибрирует и показывает уведомление (оно будит экран). Приложение при пробуждении экрана
// откроется само (setWakeUpRelaunch), посчитает закончившееся и отправит на телефон.
// Служба живёт доли секунды, поэтому ничего тяжёлого здесь нет.
import { Vibrator, VIBRATOR_SCENE_STRONG_REMINDER } from '@zos/sensor'
import { notify } from '@zos/notification'

AppService({
  onInit(param) {
    const quick = String(param || '').indexOf('quick') >= 0
    try {
      const v = new Vibrator()
      v.start({ mode: VIBRATOR_SCENE_STRONG_REMINDER })
    } catch (e) { /* вибрация не вышла — останется вибрация уведомления */ }
    try {
      notify({
        title: 'U613',
        content: quick ? 'Красный таймер закончился' : 'Час закончился — пора менять занятие',
        vibrate: 5,
        actions: [{ text: 'Открыть', file: 'page/index', vibrate: 5 }]
      })
    } catch (e) { /* уведомление не вышло */ }
  },
  onDestroy() {}
})

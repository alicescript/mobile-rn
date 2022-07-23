
//
//  NotificationDriver.swift
//  go-bridge
//
//  Created by Guilhem Fanton on 07/09/2020.
//

import Foundation
import Swishhbridge
import UserNotifications
import CoreMotion

public class NotificationDriver: NSObject, SwishhbridgeNotificationDriverProtocol {
    public static var shared: NotificationDriver = NotificationDriver()
    public static var identifier: String = "tech.swishh.ios.bridge.notification"
    let logger: LoggerDriver = LoggerDriver("tech.swishh", "notif")

    func set(identifier: String) {
        NotificationDriver.identifier = identifier
    }

    func schedule(_ notif: SwishhbridgeLocalNotification) {
        let content = UNMutableNotificationContent()
        content.title = notif.title
        content.body = notif.body

        var trigger: UNNotificationTrigger? = nil
        if notif.interval > 0.0 {
            trigger = UNTimeIntervalNotificationTrigger(timeInterval: notif.interval, repeats: false)
        }

        let request = UNNotificationRequest(identifier: NotificationDriver.identifier, content: content, trigger: trigger)

        UNUserNotificationCenter.current().add(request) { [weak self] error in
            if let error = error {
                self!.logger.print("unable to schedule notification: \(error.localizedDescription)" as NSString, level: .warn)
                return
            }
        }
    }

    public func post(_ notif: SwishhbridgeLocalNotification?) throws {
        guard let notif = notif else {
            throw BridgeError("Empty notification request")
        }

        UNUserNotificationCenter.current().getNotificationSettings { settings in
            switch settings.authorizationStatus {
            case .authorized, .provisional:
                self.schedule(notif)
            default:
                self.logger.print("unable to schedule notification, permission not granted", level: .warn)
                break
            }
        }
    }
}

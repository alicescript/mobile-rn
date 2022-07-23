//
//  LifeCycleDriver.swift
//  GoBridge
//
//  Created by Guilhem Fanton on 11/08/2020.
//  Copyright © 2020 Swishh Technologies. All rights reserved.
//

import Foundation
import Swishhbridge

public enum AppState {
    case background
    case inactive
    case active
}

public class LifeCycleDriver: NSObject, SwishhbridgeLifeCycleDriverProtocol {
    public static var shared: LifeCycleDriver = LifeCycleDriver()
    var handler: SwishhbridgeLifeCycleHandlerProtocol? = nil
    let logger: LoggerDriver = LoggerDriver("tech.swishh", "lifecycle")

    public func register(_ handler: SwishhbridgeLifeCycleHandlerProtocol?) {
        self.handler = handler
    }

    public func getCurrentState() -> Int {
        if (Thread.current.isMainThread) {
            return UIApplication.shared.applicationState.getBridgeState()
        }

        return SwishhbridgeAppStateUnknown
    }

    public func handleBackgroundTask() -> SwishhbridgeLifeCycleBackgroundTaskProtocol? {
        return self.handler?.handleTask()
    }

    public func updateState(state: UIApplication.State) {
        if let handler = self.handler {
            handler.handleState(state.getBridgeState())
        } else {
            self.logger.print("no state handler set", level: .warn)
        }
    }

    public func willTerminate() {
        if let handler = self.handler {
            handler.willTerminate()
        } else {
            self.logger.print("no state handler set", level: .warn)

        }
    }
}

extension UIApplication.State {
    func getBridgeState() -> Int {
        switch self {
        case .active:
            return SwishhbridgeAppStateActive
        case .background:
            return SwishhbridgeAppStateBackground
        case .inactive:
            return SwishhbridgeAppStateInactive
        default:
            return SwishhbridgeAppStateUnknown
        }
    }
}

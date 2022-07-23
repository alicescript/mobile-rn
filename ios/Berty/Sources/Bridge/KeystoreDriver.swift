import Foundation
import Swishhbridge
import Swishhpush

public class KeystoreDriver: NSObject, SwishhbridgeNativeKeystoreDriverProtocol, SwishhpushNativeKeystoreDriverProtocol {
  public static var shared: KeystoreDriver = KeystoreDriver()

  public func put(_ key: String?, data: Data?) throws {
    try self.handleAppUninstallation()
    let identifier = key!.data(using: String.Encoding.utf8)!
    let addquery: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                   kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly,
                                   kSecAttrGeneric as String: identifier,
                                   kSecAttrAccount as String: identifier,
                                   kSecAttrService as String: "SwishhNativeKeystore",
                                   kSecValueData as String: data!,
                                   kSecAttrAccessGroup as String: try Common.groupID()]
    let status = SecItemAdd(addquery as CFDictionary, nil)
    guard status == errSecSuccess else {
      let errstr = SecCopyErrorMessageString(status, nil)! as String
      throw NSError(domain: "SecItemAdd failed: " + errstr, code: 0)
    }
  }
  
  public func get(_ key: String?) throws -> Data {
    try self.handleAppUninstallation()
    let identifier = key!.data(using: String.Encoding.utf8)!
    let getquery: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
                                   kSecAttrGeneric as String: identifier,
                                   kSecAttrAccount as String: identifier,
                                   kSecAttrService as String: "SwishhNativeKeystore",
                                   kSecReturnData as String: kCFBooleanTrue!,
                                   kSecMatchLimit as String: kSecMatchLimitOne,
                                   kSecAttrAccessGroup as String: try Common.groupID()]
    var item: CFTypeRef?
    let status = SecItemCopyMatching(getquery as CFDictionary, &item)
    if status != errSecSuccess {
      let errstr = SecCopyErrorMessageString(status, nil)! as String
      throw NSError(domain: "SecItemCopyMatching failed: " + errstr, code: 0)
    }
    return item as! Data
  }

  private func handleAppUninstallation() throws {
    let commonUserDefaults = try Common.userDefaults()
    if (!commonUserDefaults.bool(forKey: "SwishhNativeKeystoreIsAppInstalled")) {
      self.clearSecureKeyStore()
      commonUserDefaults.set(true, forKey:"SwishhNativeKeystoreIsAppInstalled")
      commonUserDefaults.synchronize()
    }
  }

  private func clearSecureKeyStore() {
      let secItemClasses = [
        kSecClassGenericPassword,
        kSecAttrGeneric,
        kSecAttrAccount,
        kSecClassKey,
        kSecAttrService
      ]
      for secItemClass in secItemClasses {
        let spec: [String: Any] = [kSecClass as String: secItemClass]
        SecItemDelete(spec as CFDictionary)
      }
  }
}

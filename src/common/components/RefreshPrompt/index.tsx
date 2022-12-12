import React from 'react'
import { Button, Modal } from 'antd'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { pwaInfo } from 'virtual:pwa-info'

//const intervalMS = 60 * 60 * 1000
const intervalMS = 6 * 1000

console.log('=== PWA ===', pwaInfo)

export const RefreshPrompt = (): JSX.Element => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegisterError(error) {
      console.error('RaptorSW registration error:', error)
    },
    onRegisteredSW(swUrl, r) {
      r &&
        setInterval(async () => {
          if (!(!r.installing && navigator)) return
          if ('connection' in navigator && !navigator.onLine) return
          try {
            const resp = await fetch(swUrl, {
              cache: 'no-store',
              headers: {
                cache: 'no-store',
                'cache-control': 'no-cache'
              }
            })
            console.log('RaptorSW Checking for updates 👀')
            if (resp?.status === 200) await r.update()
          } catch (error) {
            console.error('onRegisteredSW :', error)
          }
        }, intervalMS)
    }
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  console.log('here sssdsope', offlineReady, needRefresh)

  return (
    <>
      {(offlineReady || needRefresh) && (
        <Modal
          open
          zIndex={1099}
          centered={true}
          title={offlineReady ? 'Available offline 🗿' : 'New version 🤧'}
          closable={false}
          maskClosable={false}
          footer={[
            <Button key="close" type="primary" onClick={() => close()}>
              Close
            </Button>,
            <>
              {needRefresh && (
                <Button
                  key="refresh"
                  type="primary"
                  onClick={() => updateServiceWorker(true)}
                >
                  Refresh
                </Button>
              )}
            </>
          ]}
        >
          {offlineReady ? (
            <span>Raptor Map is now available offline</span>
          ) : (
            <span>New version available, click on refresh to update.</span>
          )}
        </Modal>
      )}
    </>
  )
}

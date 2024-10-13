import { useState } from "react"
import { useCopyToClipboard } from "usehooks-ts"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Copy, Key, Wallet, Check } from "lucide-react"
import { toast } from "@/components/hooks/use-toast"

export default function DemoTabs() {
  const [_, copy] = useCopyToClipboard()
  const [copiedKey1, setCopiedKey1] = useState(false)
  const [copiedAddress1, setCopiedAddress1] = useState(false)
  const [copiedKey2, setCopiedKey2] = useState(false)
  const [copiedAddress2, setCopiedAddress2] = useState(false)

  const account1 = {
    privateKey: "0x0c899d240ac5f6da0b215aa5be65af386dbb96d04be69cdf6d59544cb0eac6b0",
    address: "0x1cb4f41609e8DC106A56F7c68D6c1c8Efd59F5A5"
  }

  const account2 = {
    privateKey: "0xa4504719fdda09928239be144485a9add47d891a8b0f762ceea581e9a304d929",
    address: "0xa50b3b592762B4Ad516b8BBc2561f73987620b90"
  }
  //Function to truncate wallet address
  const truncateWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleCopy = (text: string, setCopied: (value: boolean) => void) => {
    copy(text)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      
        <Alert className="mb-6">
          <Key className="h-4 w-4" />
          <AlertTitle>Security Warning</AlertTitle>
          <AlertDescription>
            These are demo keys. Never share real private keys.
          </AlertDescription>
        </Alert>
        <Tabs defaultValue="account1" className="w-full mb-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account1">nairatocrypto1.base.eth</TabsTrigger>
            <TabsTrigger value="account2">nairatocrypto2.base.eth</TabsTrigger>
          </TabsList>
          <TabsContent value="account1">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Private Key</Label>
                <div className="flex items-center justify-between rounded-md border p-2">
                  <code className="text-sm break-all">{account1.privateKey}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(account1.privateKey, setCopiedKey1)}
                  >
                    {copiedKey1 ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Wallet Address</Label>
                <div className="flex items-center justify-between rounded-md border p-2">
                  <code className="text-sm break-all">{account1.address}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(account1.address, setCopiedAddress1)}
                  >
                    {copiedAddress1 ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="account2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Private Key</Label>
                <div className="flex items-center justify-between rounded-md border p-2">
                  <code className="text-sm break-all">{account2.privateKey}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(account2.privateKey, setCopiedKey2)}
                  >
                    {copiedKey2 ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Wallet Address</Label>
                <div className="flex items-center justify-between rounded-md border p-2">
                  <code className="text-sm break-all">{account2.address}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(account2.address, setCopiedAddress2)}
                  >
                    {copiedAddress2 ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      
    </>
  )
}
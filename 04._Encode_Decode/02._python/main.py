encoded_message = "hallå".encode()
decoded_message = encoded_message.decode()

print(encoded_message)  # b'hall\xc3\xa5'
print(decoded_message)  # hallå

import base64

msg = "hallå"
encoded = base64.b64encode(msg.encode())
decoded = base64.b64decode(encoded).decode()

print(encoded)  # b'aGFsbMOh'
print(decoded)  # hallå
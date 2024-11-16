package utils

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"io"
	"os"
)

func Encrypt(text string) (string, error) {
	key := []byte(os.Getenv("SECRET"))

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", fmt.Errorf("failed to create cipher block: %w", err)
	}

	plaintext := []byte(text)

	iv := make([]byte, aes.BlockSize)
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		return "", fmt.Errorf("failed to create IV: %w", err)
	}

	ciphertext := make([]byte, len(plaintext))

	stream := cipher.NewCFBEncrypter(block, iv)

	stream.XORKeyStream(ciphertext, plaintext)

	result := make([]byte, len(iv)+len(ciphertext))
	copy(result, iv)
	copy(result[len(iv):], ciphertext)

	return base64.StdEncoding.EncodeToString(result), nil
}

func Decrypt(text string) (string, error) {
	key := []byte(os.Getenv("SECRET"))

	ciphertext, err := base64.StdEncoding.DecodeString(text)
	if err != nil {
		return "", fmt.Errorf("failed to decode base64: %w", err)
	}

	if len(ciphertext) < aes.BlockSize {
		return "", fmt.Errorf("ciphertext too short")
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", fmt.Errorf("failed to create cipher block: %w", err)
	}

	iv := ciphertext[:aes.BlockSize]
	ciphertext = ciphertext[aes.BlockSize:]

	stream := cipher.NewCFBDecrypter(block, iv)

	plaintext := make([]byte, len(ciphertext))
	stream.XORKeyStream(plaintext, ciphertext)

	return string(plaintext), nil
}

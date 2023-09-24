package github

import (
	"fmt"
	"net/http"
	"net/url"
	"openfork/api/envconfig"
	"strings"

	"github.com/gofiber/fiber/v2"
)

type AccessTokenResponse struct {
	AccessToken string `json:"access_token"`
}

func GitHubCallbackHandler(c *fiber.Ctx) error {

	AppConfig := envconfig.Load()
	code := c.Query("code")

	data := url.Values{}
	data.Set("client_id", AppConfig.GitHubClientID)
	data.Set("client_secret", AppConfig.GitHubClientSecret)
	data.Set("code", code)

	req, err := http.NewRequest("POST", "https://github.com/login/oauth/access_token", strings.NewReader(data.Encode()))

	fmt.Println(req)

	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString("Error1: " + err.Error())
	}

	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString("Error2: " + err.Error())
	}
	defer resp.Body.Close()

	fmt.Println(resp)

	if resp.StatusCode != http.StatusOK {
		return c.Status(http.StatusInternalServerError).SendString("Error3: " + resp.Status)
	}

	accessTokenResponse := new(AccessTokenResponse)

	// fmt.Println(accessTokenResponse)/

	err = c.BodyParser(accessTokenResponse)
	if err != nil {
		return c.Status(http.StatusInternalServerError).SendString("Error4: " + err.Error())
	}

	accessToken := accessTokenResponse.AccessToken

	return c.SendString(accessToken)

}

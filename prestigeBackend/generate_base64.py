import base64

consumer_key = "cXaE37rbTM9OWOAtfKR91QejxB0a"
consumer_secret = "9_5YfPAHhnhDW_lHsJIDf_tDuSQa"

credentials = f"{consumer_key}:{consumer_secret}"
credentials_base64 = base64.b64encode(credentials.encode("utf-8")).decode("utf-8")

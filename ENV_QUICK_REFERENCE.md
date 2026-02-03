# 🔐 Quick Reference: Environment Variables

## 📋 Quick Commands

### Development Setup
```bash
# 1. Copy the example file
cd Backend
cp .env.example .env

# 2. Edit .env with your credentials
# (Use any text editor)

# 3. Verify it's working
python manage.py runserver
```

### Check Git Status
```bash
# Verify .env is NOT tracked
git status
# .env should NOT appear in the list

# If .env appears, add it to .gitignore:
echo .env >> .gitignore
```

## 📝 Environment Variables Quick Reference

| Variable | Required? | Default | Description |
|----------|-----------|---------|-------------|
| `SECRET_KEY` | ✅ Yes | None | Django secret key for cryptographic signing |
| `DB_PASSWORD` | ✅ Yes | None | PostgreSQL database password |
| `DEBUG` | No | `True` | Debug mode (set to `False` in production) |
| `DB_NAME` | No | `jobportal_db` | Database name |
| `DB_USER` | No | `postgres` | Database username |
| `DB_HOST` | No | `localhost` | Database host |
| `DB_PORT` | No | `5432` | Database port |
| `ALLOWED_HOSTS` | No | `localhost,127.0.0.1` | Comma-separated list of allowed hosts |
| `CORS_ALLOWED_ORIGINS` | No | `http://localhost:5173` | Comma-separated list of CORS origins |

## 🚀 Production Deployment Checklist

```bash
# 1. Generate new SECRET_KEY
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

# 2. Create production .env on server
nano .env

# 3. Set production values
SECRET_KEY=<generated-key>
DEBUG=False
DB_PASSWORD=<strong-password>
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# 4. Verify settings
python manage.py check --deploy
```

## ⚠️ Common Issues

### Issue: "No module named 'decouple'"
```bash
pip install python-decouple
```

### Issue: "KeyError: 'DB_PASSWORD'"
**Solution:** Make sure `.env` file exists and contains `DB_PASSWORD=your-password`

### Issue: Server won't start after changes
```bash
# 1. Check .env file exists
dir .env  # Windows
ls .env   # Linux/Mac

# 2. Verify .env has correct format (no quotes around values)
DB_PASSWORD=mypassword  # ✅ Correct
DB_PASSWORD="mypassword"  # ❌ Wrong (will include quotes)

# 3. Restart server
python manage.py runserver
```

### Issue: .env appears in git status
```bash
# Add to .gitignore
echo .env >> .gitignore

# Remove from git cache if already tracked
git rm --cached .env
git commit -m "Remove .env from version control"
```

## 🔒 Security Best Practices

### ✅ DO:
- ✅ Use strong, unique passwords
- ✅ Generate new SECRET_KEY for production
- ✅ Set DEBUG=False in production
- ✅ Keep .env file gitignored
- ✅ Use HTTPS in production
- ✅ Rotate credentials regularly
- ✅ Use different credentials for dev/prod

### ❌ DON'T:
- ❌ Commit .env file to Git
- ❌ Share .env file in public channels
- ❌ Use development credentials in production
- ❌ Use simple passwords like "password123"
- ❌ Run DEBUG=True in production
- ❌ Hardcode credentials in settings.py

## 📚 File Structure

```
Job portal/
├── Backend/
│   ├── .env                 # ❌ Your actual credentials (GITIGNORED)
│   ├── .env.example         # ✅ Template (safe to commit)
│   ├── requirements.txt     # ✅ Python dependencies
│   └── Backend/
│       └── settings.py      # ✅ Uses environment variables
├── .gitignore              # ✅ Contains .env
├── SECURITY.md             # ✅ Full security guide
└── README.md               # ✅ Updated with security info
```

## 🆘 Emergency: Credentials Exposed

If you accidentally commit credentials to Git:

```bash
# 1. IMMEDIATELY change all exposed credentials
# - Generate new SECRET_KEY
# - Change database password
# - Update any other exposed secrets

# 2. Update .env with new credentials
nano .env

# 3. Consider creating a new repository
# (Removing from Git history is complex)

# 4. Verify .gitignore is working
git status  # .env should NOT appear
```

## 💡 Tips

1. **Keep .env.example updated** - When adding new variables, update the example
2. **Document variables** - Add comments in .env.example
3. **Use strong passwords** - At least 16 characters with mixed case, numbers, symbols
4. **Test before deploying** - Always test with production-like settings first
5. **Backup .env** - Keep secure backup of production .env (NOT in Git)

---

**For detailed information, see [SECURITY.md](SECURITY.md)**
